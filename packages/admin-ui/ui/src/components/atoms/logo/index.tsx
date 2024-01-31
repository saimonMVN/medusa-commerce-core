import clsx from "clsx";
import React, { ReactNode, useImperativeHandle } from "react";

export type LogoProps = React.HTMLAttributes<HTMLDivElement> & {
    imageUrl: string;
};

const Logo = React.forwardRef(
    ({ imageUrl, className, ...rest }: LogoProps, ref) => {
        return (
            <div
                className={clsx("flex", className)}
                {...rest}
            >
                <img
                    src={imageUrl}
                    alt="MoveShop"
                    className="w-32 mx-auto"
                />
            </div>
        );
    }
);

export default Logo;
