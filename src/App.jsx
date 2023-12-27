import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null)

  //useCallback
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "#$%&'()*+-/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  //useEffect
    useEffect(() => {
      passwordGenerator()
    },[length, numberAllowed, charAllowed, passwordGenerator])

    //useCallback
    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select()//for copy select letters from input
      passwordRef.current?.setSelectionRange(0, 100);// for selecting 0 to 100 letters from input
      window.navigator.clipboard.writeText(password)
    })//for copy letters from inputs

  return (
    <>
      <div className="w-full max-w-xl mx-auto h-40 shadow-md rounded-lg px-8 py-3 my-20 bg-gray-700 text-orange-500">
        <h1 className="text-white text-center my-3 md-fontbold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard} 
          className="outline-none hover:bg-blue-400 bg-blue-800 text-white px-3 py-0.5 shrink-0"
          >copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-3">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
              className="h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
