import React from "react";

export interface INavbarProps {}

export const Navbar: React.FC<INavbarProps> = (props: INavbarProps) => {
  return (
    <header>
      <h1>Around The Horn</h1>
      <div className="highlight"></div>
    </header>
  );
};
