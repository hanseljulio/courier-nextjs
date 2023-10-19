import React from "react";

interface VoucherPillProps {
  code: string;
}

function VoucherPill(props: VoucherPillProps) {
  return (
    <div className="bg-red-500 p-4 rounded-full hover:cursor-pointer">
      {props.code}
    </div>
  );
}

export default VoucherPill;
