const Footer = () => {
  return (<>
  
  <footer className="w-full mt-auto"> 
      <svg
        viewBox="0 0 1440 200"
        className="w-full h-auto "
        preserveAspectRatio="none"
      >
        {/* موج اول (تیره تر و بلندتر) */}
        <path
          className="fill-gray-300"
          d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,144C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L0,320Z"
        />
        {/* موج دوم (روشن‌تر و کوتاه‌تر برای ایجاد تضاد) */}
        <path
  className="fill-gray-400 opacity-80"
  d="M0,150L48,160C96,170,192,185,288,180C384,175,480,150,576,155C672,160,768,190,864,195C960,200,1056,170,1152,160C1248,150,1344,160,1392,165L1440,170L1440,320L0,320Z"
/>
      </svg>

      <div className="bg-gray-400 text-white p-2 text-center -mt-1 ">
        <p>کپی رایت ۱۴۰۴</p>
      </div>
    </footer></>
  )
}
export default Footer;