import React from "react";

interface VoucherPillProps {
  id: number;
  code: string;
  applyVoucher: (code: string, id: number) => void;
}

function VoucherPill(props: VoucherPillProps) {
  return (
    <div
      onClick={() => props.applyVoucher(props.code, props.id)}
      className="bg-red-500 p-4 rounded-full hover:cursor-pointer hover:bg-red-300 w-[160px] mobile:w-full"
    >
      {props.code}
    </div>
  );
}

export default VoucherPill;
