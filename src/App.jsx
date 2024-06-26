import { useState, useCallback, useRef} from 'react'

import './App.css'

function App() {
  const [len, setLength] = useState(8)
  const [number, numberAllowed] = useState(false)
  const [charac, characterAllowed] = useState(false)
  const [password, setPassword] = useState("a")
 
 let passRef = useRef(null) 
  
  let passwordGen = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = ""
   
   if (numberAllowed) {
      str+="123456789"
    }
    if (characterAllowed) {
      str+="!@#$%^&*(){}_+=~"
    }
    for (let i = 1; i < len; i++) {
    let char = Math.floor(Math.random()*str.length )
      pass += str.charAt(char);
      
    }
    console.log("Generated password:", pass);
    setPassword((pass))

   
  }, [len, number, charac])
  const copyPasstoClip = useCallback(() => {
    if (passRef.current) {
      passRef.current?.select();
      
      alert("Password copied to clipboard");
    }
  }, []);
 
  return (
    <>
      <div className="w-full h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-[600px] h-auto rounded-xl bg-gray-800 ">
          <h1 className="py-3 text-2xl text-white ">Password generator</h1>
          <div className="flex  rounded-lg w-[500px] mb-10 ml-10 overflow-hidden shadow text-black">
            <input
              type="text"
              ref={passRef}
              placeholder="password"
              value={password}
              className="w-full px-3 py-1  outline-none"
              readOnly
            />
            <button
              onClick={copyPasstoClip}
              className=" text-white outline-none px-2 py-1 bg-blue-500 hover:bg-blue-800 active:bg-blue-950  "
            >
              Copy
            </button>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={len}
              className="cursor-pointer ml-10"
              onChange={(e) => {
                setLength(parseInt(e.target.value));
              }}
            ></input>
            <label className="px-1 text-white">Length:{len}</label>
            <div className="flex gap-x-5 items-center m-4">
              <input
                type="checkbox"
                defaultChecked={number}
                onClick={() => {
                  numberAllowed((prev) => !prev);
                }}
              ></input>
              <label className="text-white">Numbers: {number}</label>
            </div>
            <div className="flex gap-x-5 items-center m-4">
              <input
                type="checkbox"
                defaultChecked={charac}
                onClick={() => {
                  characterAllowed((prev) => !prev);
                }}
              ></input>
              <label className="text-white">Character: {charac}</label>
            </div>
          </div>
          <button
            className="mt-4 mr-15 border border-blue-500 hover:border-blue-600 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded active:bg-blue-700"
            onClick={passwordGen}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App
