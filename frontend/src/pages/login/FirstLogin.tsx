import { useState } from "react";

export function FirstLogin() {
  const [ isHide, setIsHide ] = useState<boolean>(true);
  return (
    <div className="sm:w-120 bg-ultra-dark text-center rounded-xl py-5 px-3 shadow-[0_0_250px_25px_#b1b1b1]">
      <div>
        <h2 className="text-3xl font-bold">Welcome To MySchedule</h2>
        <h3 className="text-2xl text-light-gray">Good luck with your new day</h3>
      </div>
      <form className="pt-10 flex gap-5 flex-col">
        <div className="relative flex items-center">
          <svg className="w-8 absolute left-1.5 fill-light-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
          </svg>
          <input className="w-full bg-super-dark text-[1.35rem] focus-within:outline-0 pl-11 pr-3 py-2.5 rounded-lg" type="email" name="email" id="email" autoComplete="on" placeholder="AbrahamAdam@nationwidemedical.com"/>
        </div>
        <div className="relative flex items-center">
          <svg className="w-8 absolute left-1.5 fill-light-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"/>
          </svg>
          <input className="w-full bg-super-dark text-[1.35rem] focus-within:outline-0 pl-11 pr-3 py-2.5 rounded-lg" type={isHide ? "password" : "text"} name="email" id="email" autoComplete="on" placeholder="Temp password"/>
          {
            isHide
            ? <svg onClick={() => setIsHide(false)} className="w-7 absolute right-1.5 fill-light-gray cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"/>
            </svg>
            : <svg onClick={() => setIsHide(true)} className="w-7 absolute right-1.5 fill-light-gray cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/>
            </svg>
          }
        </div>
        <button type="submit" className="bg-neon-blue py-2 text-2xl rounded-lg cursor-pointer font-semibold">Confirm</button>
      </form>
    </div>
  );
};