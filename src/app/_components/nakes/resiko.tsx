"use client";

import { useState, useEffect } from "react";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";

interface ResikoPasien {
  idResikoPasien: any;
}

const opsiResiko = [
  { idResiko: 1, name: "Resiko Tinggi", color: "#FA646A" },
  { idResiko: 2, name: "Resiko Sedang", color: "#FAB900" },
  { idResiko: 3, name: "Resiko Rendah", color: "#78C142" },
];

export default function ResikoDesktop({ idResikoPasien }: ResikoPasien) {
  const [selected, setSelected] = useState<{ name: string; color: string }>({
    name: "Pilih Resiko",
    color: "#CBD5E1",
  });

  useEffect(() => {
    if (idResikoPasien !== null && idResikoPasien !== undefined) {
      const found = opsiResiko.find((o) => o.idResiko === idResikoPasien);
      if (found) setSelected({ name: found.name, color: found.color });
    } else if (idResikoPasien === null) {
      setSelected({ name: "Pilih Resiko", color: "#CBD5E1" });
    }
  }, [idResikoPasien]);

  const items: MenuProps["items"] = opsiResiko.map((opsi) => ({
    key: opsi.idResiko,
    label: (
      <div
        style={{
          padding: "6px 12px",
          borderRadius: 8,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = opsi.color;
          (e.currentTarget as HTMLElement).style.color = "white";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "white";
          (e.currentTarget as HTMLElement).style.color = "black";
        }}
        onClick={() => setSelected({ name: opsi.name, color: opsi.color })}
      >
        {opsi.name}
      </div>
    ),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        style={{
          backgroundColor: selected.color,
          color: "white",
          borderRadius: 5,
          width: 170,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: 16,
        }}
      >
        {selected.name}
        <img src="/drop-down.svg" style={{ width: 20, height: 20 }} />
      </Button>
    </Dropdown>
  );
}
