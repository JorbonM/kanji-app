import { useEffect, useRef, useState } from "react";
import { KanjiWriter,KanjiVGParser } from "kanji-recognizer";
import { useLocation } from "react-router";


export default function Canvas() {
  const location = useLocation();
  const writerRef = useRef(null);
  let timesWritten = 0;
  const maxTimesSpecified = 2;
  let attempts = [];

  useEffect(() => {
    let cancelled = false;
    async function init() {
      if(!Object.hasOwn(location.state,'kanji'))
        return //throw some error here
      
      KanjiVGParser.baseUrl = "../../assets/kanji/"

      const kanjiData = await KanjiVGParser.fetchData(location.state.kanji);

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
          attempts.push(writer.userScores)
          writer.clear()
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
  }, [location]);

  return (
    <div
      id="container"
      className="w-[300px] h-[300px]"
    />
  );
}