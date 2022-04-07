const db = require("../db/db-query-report");
const reportGenerator = require("./util/reportGenerator");

const sessionReport = async (userId, sessionId) => {
  try {
    const report = await reportGenerator({
      reportName: `Session Report - `,
      reportId: "some id",
      sections: [
        {
          title: "Reporting area",
          items: [
            {
              name: "cat 1",
              value: "val 1",
            },
            {
              name: "cat 2",
              value: "val 2",
            },
          ],
        },
      ],
    });
    return report;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = sessionReport;
