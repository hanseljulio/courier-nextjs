import React from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import Input from "@/components/Input";
import Image from "next/image";

function PackageDimensions() {
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
