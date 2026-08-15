import { useEffect, useRef, useState } from "react";
import { KanjiWriter,KanjiVGParser } from "kanji-recognizer";

export default function Canvas() {
  const writerRef = useRef(null);
  let timesWritten = 0;
  const maxTimesSpecified = 2;
  useEffect(() => {
    let cancelled = false;

    async function init() {
      console.log("Fetching KanjiVG data for:", '中');

      KanjiVGParser.baseUrl = "assets/kanji/"

      const kanjiData = await KanjiVGParser.fetchData('中');

      console.log("Raw kanjiData:", kanjiData);
      console.log("Type:", typeof kanjiData);
      console.log("Is array:", Array.isArray(kanjiData));
      console.log("Length:", kanjiData?.length);
      if (cancelled) return;

      const container = document.getElementById("container");

      // Make sure there is only one writer
      container.innerHTML = "";

      const writer = new KanjiWriter("container", kanjiData, {
        width: 300,
        height: 300,
        passThreshold: 8,
        startDistThreshold: 25,
        showGhost: true,
        hintColor: "#00ff00",
        walkthrough: true
      });

      writerRef.current = writer;
      writer.onComplete = () =>
      {
        timesWritten++;
        console.log(timesWritten)
        if(timesWritten <maxTimesSpecified)
        {
          writer.clear()
          //save accuracy


        }
        else
        {
          //Take user to another page to show results
        }

      }
    }

    init();

    return () => {
      cancelled = true;

      writerRef.current?.destroy?.();
      writerRef.current = null;

      const container = document.getElementById("container");

      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id="container"
      className="w-[300px] h-[300px]"
    />
  );
}