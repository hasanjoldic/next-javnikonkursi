import React, { useMemo } from "react";

import { ERegion, regions } from "@/data";

import ComboboxMulti from "@/components/combobox-multi";

import { useAppState } from "@/app/layout.provider";;

export default function Filters() {
  const {
    companies,
    jobTypes,
    filters,
    setFilters,
  } = useAppState();

  const companyOptions = useMemo(() => {
    return companies.map((o) => ({
      label: o.title,
      value: o.id,
    }));
  }, [companies]);

  const jobTypeOptions = useMemo(() => {
    return jobTypes.map((o) => ({
      label: o.title,
      value: o.id,
    }));
  }, [jobTypes]);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* <FormControlLabel
            control={
              <Switch
                checked={shouldIncludeExpired}
                onChange={(_event, checked) => {
                  dispatch(updateFilters({ shouldIncludeExpired: checked }));
                }}
                color="primary"
              />
            }
            label="Istekli konkursi"
          /> */}

      <ComboboxMulti
        label="Regija"
        options={regions}
        value={filters.regions}
        onChange={(value) => setFilters({
          ...filters,
          regions: value as Set<ERegion>
        })}
      />

      <ComboboxMulti
        label="Vrsta posla"
        options={jobTypeOptions}
        value={filters.jobTypes}
        onChange={(value) => setFilters({
          ...filters,
          jobTypes: value
        })}
      />

      <ComboboxMulti
        label="Javna ustanova/preduzeće"
        options={companyOptions}
        value={filters.companies}
        onChange={(value) => setFilters({
          ...filters,
          companies: value
        })}
      />
    </div>
  );
};
