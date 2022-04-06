
import { createServer } from "http";

function main() {

  let data = Buffer.alloc(1024, " ");

  let kbSize = 1024 * 10;

  let timeStart;// = Date.now();
  let server = createServer((req, res) => {
    if (req.url.endsWith("test")) {
      timeStart = Date.now();


      res.write("start");

      for (let i = 0; i < kbSize; i++) {
        res.write(data);
      }

      res.write("end");

    }
    res.end(()=>{
      let timeEnd = Date.now();
      let timeEnlapsed = timeEnd - timeStart;
      let timeEnlapsedString = (timeEnlapsed / 1000).toFixed(1);
  
      let mbps = (kbSize / (timeEnlapsed / 1000 * 1000)).toFixed(0);
      
      console.log(`Took ${timeEnlapsedString}s to send ${kbSize}kb, averaging ${mbps}mbps`);

    });

  });

  server.listen(8080);

}

main();
