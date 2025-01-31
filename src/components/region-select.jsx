import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { filterRegions } from "@/lib/helpers";

//@ts-ignore
import countryRegionData from "country-region-data/dist/data-umd";
import { useEffect, useState } from "react";

function RegionSelect({
    countryCode,
    priorityOptions = [],
    whitelist = [],
    blacklist = [],
    onChange = () => {},
    className,
    placeholder = "Region",
}) {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const regions = countryRegionData.find(
            (country) => country.countryShortCode === countryCode,
        );

        if (regions) {
            setRegions(
                filterRegions(regions.regions, priorityOptions, whitelist, blacklist),
            );
        }
    }, [countryCode]);

    return (
        <Select
            onValueChange={(value) => {
                onChange(value);
            }}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {regions.map(({ name, shortCode }) => (
                    <SelectItem key={shortCode} value={name}>
                        {name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default RegionSelect;
