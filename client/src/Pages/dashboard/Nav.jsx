import React from 'react';

const MenuItem = ({ imageUrl, altText, label }) => (
  <div className="flex gap-5 justify-between">
    <img src={imageUrl} alt={altText} className="aspect-square w-[35px]" />
    <p className="self-start mt-4">{label}</p>
  </div>
);

const Nav = () => {
  const menuItemData = [
    {
      id: 1,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/3786e830ea825221a62baf7894d52dcb8d3e09be02c9221b73b57ac02c593c08?apiKey=65e254045ad147e8ac09b67cc2360e6c&",
      altText: "Architect Icon",
      label: "Architect",
    },
    {
      id: 2,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/93b67a72ff936c2da4adf3c65e955ea30a19b699d2a82d36236ff4e363593fed?apiKey=65e254045ad147e8ac09b67cc2360e6c&",
      altText: "Projects Icon",
      label: "Projects",
    },
  ];

  return (
    <nav className="flex gap-5 justify-between px-2 max-w-full w-[609px] max-md:flex-wrap mt-7">
      {menuItemData.map(item => (
        <MenuItem key={item.id} imageUrl={item.imageUrl} altText={item.altText} label={item.label} />
      ))}
    </nav>
  );
}

export default Nav;
