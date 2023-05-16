const Marck = () => {

  const company = [
    { src: './img/nokia.png', width: '100' },
    { src: './img/oppo.png', width: '100' },
    { src: './img/apple.png', width: '45' },
    { src: './img/huawei.png', width: '45' },
    { src: './img/samsung.png', width: '105' },
    { src: './img/lenovo.png', width: '100' },
  ]

  return (
    <div className="py-6">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="mt-2 flex justify-center">
                    <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-6 md:gap-x-16 md:grid-cols-3 lg:grid-cols-6">
                      {company.map((item , i) => (
                        <li key={i} className="flex justify-center items-center">
                          <img src={item.src} width={item.width} />
                        </li>
                      ))}
                    </ul>
                </div>
            </div>
        </div>
  )
}

export default Marck