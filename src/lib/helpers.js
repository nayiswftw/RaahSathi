export const filterCountries = (
    countries,
    priorityCountries,
    whitelist,
    blacklist,
) => {
    let countriesListedFirst = [];
    let filteredCountries = countries;

    if (whitelist.length > 0) {
        filteredCountries = countries.filter(
            ({ countryShortCode }) => whitelist.indexOf(countryShortCode) > -1,
        );
    } else if (blacklist.length > 0) {
        filteredCountries = countries.filter(
            ({ countryShortCode }) => blacklist.indexOf(countryShortCode) === -1,
        );
    }

    if (priorityCountries.length > 0) {
        // ensure the countries are added in the order in which they are specified by the user
        priorityCountries.forEach((slug) => {
            const result = filteredCountries.find(
                ({ countryShortCode }) => countryShortCode === slug,
            );
            if (result) {
                countriesListedFirst.push(result);
            }
        });

        filteredCountries = filteredCountries.filter(
            ({ countryShortCode }) =>
                priorityCountries.indexOf(countryShortCode) === -1,
        );
    }

    return countriesListedFirst.length
        ? [...countriesListedFirst, ...filteredCountries]
        : filteredCountries;
};

export const filterRegions = (
    regions,
    priorityRegions,
    whitelist,
    blacklist,
) => {
    let regionsListedFirst = [];
    let filteredRegions = regions;

    if (whitelist.length > 0) {
        filteredRegions = regions.filter(
            ({ shortCode }) => whitelist.indexOf(shortCode) > -1,
        );
    } else if (blacklist.length > 0) {
        filteredRegions = regions.filter(
            ({ shortCode }) => blacklist.indexOf(shortCode) === -1,
        );
    }

    if (priorityRegions.length > 0) {
        // ensure the Regions are added in the order in which they are specified by the user
        priorityRegions.forEach((slug) => {
            const result = filteredRegions.find(
                ({ shortCode }) => shortCode === slug,
            );
            if (result) {
                regionsListedFirst.push(result);
            }
        });

        filteredRegions = filteredRegions.filter(
            ({ shortCode }) => priorityRegions.indexOf(shortCode) === -1,
        );
    }

    return regionsListedFirst.length
        ? [...regionsListedFirst, ...filteredRegions]
        : filteredRegions;
};
