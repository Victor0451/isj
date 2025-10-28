import React from "react";
import { Input, Button } from "@material-tailwind/react";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <div className="relative flex w-full max-w-[24rem]">
            <Input
                id="search"
                type="text"
                placeholder="Buscar"
                value={filterText}
                onChange={onFilter}
                className="pr-20"
                containerProps={{
                    className: "min-w-0",
                }}
            />
            <Button
                size="sm"
                className="!absolute right-1 top-1 rounded bg-red-900"
                onClick={onClear}
            >
                X
            </Button>
        </div>
    </>
);

export default FilterComponent;
