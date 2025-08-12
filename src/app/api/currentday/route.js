import axios from "axios";
import * as cheerio from "cheerio";

async function scrapeSattaData() {
  try {
    const { data: html } = await axios.get("https://satta-king-fixed-no.in/");
    const $ = cheerio.load(html);

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const currentDateString = `${day}-${month}`;
    const currentTime = today.toLocaleTimeString("en-IN", { hour12: false });

    function parseTableByIndex(index) {
      const table = $("table.newtable").eq(index);
      const headers = table.find("tr").first().find("th").map((_, el) => $(el).text().trim()).get();

      const rows = [];
      table.find("tr").slice(1).each((_, row) => {
        const cells = $(row).find("td");
        if (cells.length) {
          const date = $(cells[0]).text().trim();
          const rowData = { date };
          cells.slice(1).each((i, cell) => {
            const val = $(cell).text().trim();
            rowData[headers[i + 1]] = val || null;
          });
          rows.push(rowData);
        }
      });
      return rows;
    }

    const table1 = parseTableByIndex(0); // DISAWER/FARIDABAD/GHAZIYABAD/GALI
    const table3 = parseTableByIndex(2); // DELHI BAZAR(DL)
    const table4 = parseTableByIndex(3); // SHRI GANESH

    // Match both `08-11` and `8-11`
    const matchRow = (table) =>
      table.find(
        (row) =>
          row.date === currentDateString ||
          row.date === `${Number(12)}-${Number(month)}`
      ) || {};

    const t1Today = matchRow(table1);
    const t3Today = matchRow(table3);
    const t4Today = matchRow(table4);
     
    return {
      date: currentDateString,
      time: currentTime,
      DISAWER: t1Today["DISAWER"] || null,
      FARIDABAD: t1Today["FARIDABAD"] || null,
      GHAZIYABAD: t1Today["GHAZIYABAD"] || null,
      GALI: t1Today["GALI"] || null,
      SHRI_GANESH: t4Today["SHRI GANESH"] || null,
      DELHI_BAZAR_DL: t3Today["DELHI BAZAR(DL)"] || null,
    };
  } catch (err) {
    console.error("Error scraping:", err.message);
    return null;
  }
}

export async function GET() {
  

  try {
    const scraped = await scrapeSattaData();


    console.log(scraped);

    if (!scraped) {
      return new Response(JSON.stringify({ error: "Scraping failed" }), { status: 500 });
    }

    const [dayStr, monthStr] = scraped.date.split("-");
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);

    const postBody = {
      year: String(new Date().getFullYear()),
      month,
      resultList: [
        {
          day,
          delhiLuckyBazar: null,
          disawer: scraped.DISAWER ? Number(scraped.DISAWER) : null,
          faridabad: scraped.FARIDABAD ? Number(scraped.FARIDABAD) : null,
          gaziyabad: scraped.GHAZIYABAD ? Number(scraped.GHAZIYABAD) : null,
          kolkataKing: null,
          gali: scraped.GALI ? Number(scraped.GALI) : null,
          delhiBazar: scraped.DELHI_BAZAR_DL ? Number(scraped.DELHI_BAZAR_DL) : null,
          shreeGanesh: scraped.SHRI_GANESH ? Number(scraped.SHRI_GANESH) : null,
        },
      ],
    };

    const postRes = await axios.post(
      "https://sutta-pro-new.vercel.app/api/v1/result",
      postBody,
      { headers: { "Content-Type": "application/json" } }
    );

    return new Response(JSON.stringify(scraped), { status: 200 });
  } catch (error) {
    console.error("API Error:", error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}
