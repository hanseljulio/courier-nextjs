import React from "react";
import UserHeader from "@/components/HeaderSection";
import Input from "@/components/Input";
import Image from "next/image";

interface PackageDimensionsData {
  length: number;
  width: number;
  height: number;
  weight: number;
}

type PackageDimensionsProps = PackageDimensionsData & {
  updateFields: (fields: Partial<PackageDimensionsData>) => void;
};

function PackageDimensions(props: PackageDimensionsProps) {
  return (
    <div>
      <div className="header-section pb-8">
        <UserHeader title="Create Shipping - Package Dimensions" />
      </div>
      <div className="package-form-wrapper flex justify-center items-center gap-[150px]">
        <div className="image-section mobile:hidden">
          <Image
            src={"/images/dimensions.png"}
            alt="Nothing"
            width={200}
            height={200}
            className={`w-[300px] h-[400px]`}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="package-form-section">
          <div className="length-input flex gap-5 items-center">
            <Input
              label="Length"
              type="number"
              name="createShippingLength"
              styling="pb-6"
              width="w-[300px]"
              value={props.length.toString()}
              onChange={(e) => props.updateFields({ length: e.target.value })}
              required
            />
            <h1 className="font-bold text-[20px]">CM</h1>
          </div>
          <div className="width-input flex gap-5 items-center">
            <Input
              label="Width"
              type="number"
              name="createShippingWidth"
              styling="pb-6"
              width="w-[300px]"
              value={props.width.toString()}
              onChange={(e) => props.updateFields({ width: e.target.value })}
              required
            />
            <h1 className="font-bold text-[20px]">CM</h1>
          </div>
          <div className="height-input flex gap-5 items-center">
            <Input
              label="Height"
              type="number"
              name="createShippingHeight"
              styling="pb-6"
              width="w-[300px]"
              value={props.height.toString()}
              onChange={(e) => props.updateFields({ height: e.target.value })}
              required
            />
            <h1 className="font-bold text-[20px]">CM</h1>
          </div>
          <div className="weight-input flex gap-5 items-center">
            <Input
              label="Weight"
              type="number"
              name="createShippingWeight"
              styling="pb-6"
              width="w-[300px]"
              value={props.weight.toString()}
              onChange={(e) => props.updateFields({ weight: e.target.value })}
              required
            />
            <h1 className="font-bold text-[20px]">KG</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDimensions;
