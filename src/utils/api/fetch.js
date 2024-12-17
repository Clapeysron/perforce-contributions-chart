import { exec } from 'child_process';
import { promisify } from 'util';
import _ from "lodash";

const execAsync = promisify(exec);

const COLOR_MAP = {
  0: "#ebedf0",
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39"
};

async function getP4Changes(username, startDate, endDate) {
  try {
    const command = `p4 changes -u ${username} @${startDate},@${endDate}`;
    const { stdout } = await execAsync(command);
    return stdout.split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('执行 p4 命令出错:', error);
    return [];
  }
}

async function fetchYears(username) {
  try {
    // 获取所有变更记录
    const command = `p4 changes -u ${username}`;
    const { stdout } = await execAsync(command);
    const changes = stdout.split('\n').filter(line => line.trim());
    
    // 如果没有提交记录，返回空数组
    if (changes.length === 0) {
      return [];
    }

    // 获取最早的提交日期
    const lastChange = changes[changes.length - 1];
    const firstSubmitYear = parseInt(lastChange.split(' ')[3].split('/')[0]);
    
    // 获取当前年份
    const currentYear = new Date().getFullYear();
    
    // 创建从第一次提交到现在的年份数组
    const years = [];
    for (let year = currentYear; year >= firstSubmitYear; year--) {
      years.push({
        href: `/activity?user=${username}&year=${year}`,
        text: year.toString()
      });
    }
    
    return years;
  } catch (error) {
    console.error('获取年份数据出错:', error);
    return [];
  }
}

async function fetchDataForYear(url, year, format) {
  const startDate = `${year}/01/01`;
  const endDate = `${year}/12/31`;
  const username = url.split('user=')[1].split('&')[0];
  
  const changes = await getP4Changes(username, startDate, endDate);
  
  // 创建一个完整年份的日期数组
  const daysInYear = [];
  const startDateTime = new Date(year, 0, 1);
  const endDateTime = new Date(year, 11, 31);
  
  for (let d = new Date(startDateTime); d <= endDateTime; d.setDate(d.getDate() + 1)) {
    daysInYear.push(new Date(d));
  }

  // 统计每天的提交次数
  const dailyContributions = new Map();
  changes.forEach(change => {
    const date = change.split(' ')[3].split('/').slice(0, 3).join('-');
    dailyContributions.set(date, (dailyContributions.get(date) || 0) + 1);
  });

  const contribCount = changes.length;

  return {
    year,
    total: contribCount,
    range: {
      start: `${year}-01-01`,
      end: `${year}-12-31`
    },
    contributions: (() => {
      const contributions = daysInYear.map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const count = dailyContributions.get(dateStr) || 0;
        const intensity = Math.min(Math.floor((count + 1) / 2), 4);
        
        return {
          date: dateStr,
          count,
          color: COLOR_MAP[intensity],
          intensity
        };
      });

      if (format !== "nested") {
        return contributions;
      }

      return contributions.reduce((o, contrib) => {
        const [y, m, d] = contrib.date.split('-').map(Number);
        if (!o[y]) o[y] = {};
        if (!o[y][m]) o[y][m] = {};
        o[y][m][d] = contrib;
        return o;
      }, {});
    })()
  };
}

export async function fetchDataForAllYears(username, format) {
  const years = await fetchYears(username);
  return Promise.all(
    years.map((year) => fetchDataForYear(year.href, year.text, format))
  ).then((resp) => {
    return {
      years: (() => {
        const obj = {};
        const arr = resp.map((year) => {
          const { contributions, ...rest } = year;
          _.setWith(obj, [rest.year], rest, Object);
          return rest;
        });
        return format === "nested" ? obj : arr;
      })(),
      contributions:
        format === "nested"
          ? resp.reduce((acc, curr) => _.merge(acc, curr.contributions))
          : resp
              .reduce((list, curr) => [...list, ...curr.contributions], [])
              .sort((a, b) => {
                if (a.date < b.date) return 1;
                else if (a.date > b.date) return -1;
                return 0;
              })
    };
  });
}
