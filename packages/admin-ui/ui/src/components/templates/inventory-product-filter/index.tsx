import { useAdminRegions, useAdminSalesChannels } from "medusa-react"
import { useEffect, useState } from "react"
import FilterDropdownContainer from "../../../components/molecules/filter-dropdown/container"
import { useFeatureFlag } from "../../../providers/feature-flag-provider"
import Button from "../../fundamentals/button"
import FilterIcon from "../../fundamentals/icons/filter-icon"
import { filterForTemporal } from "../../../utils/date-utils"
import { IConfigurator } from "../../../types/inventoryProduct"
import CustomFormElement from "../moveOn-custom-from-for-filter"
import FilterDropdownItem from "../../molecules/filter-dropdown/item"

const REGION_PAGE_SIZE = 10
const CHANNEL_PAGE_SIZE = 10

interface IInventoryFilterProps {
  filters: any
  isFetched: boolean
  filtersData: IConfigurator | undefined
  submitFilters: () => void
  clearFilters: () => void
  handleFilterChange: (filter: IConfigurator) => void
}
const InventoryProductFilters = ({
  filters,
  submitFilters,
  clearFilters,
  filtersData,
  handleFilterChange,
  isFetched,
}: IInventoryFilterProps) => {
  const DisplayItem = 10

  const [tempState, setTempState] = useState(filtersData)
  const [name, setName] = useState("")
  const { isFeatureEnabled } = useFeatureFlag()
  const isSalesChannelsEnabled = isFeatureEnabled("sales_channels")
  const [cidPaginate, setCidPaginate]=useState({startIndex:0, endIndex:DisplayItem})
  const [attrValue, setAttrValue] = useState<string[]>([])


  useEffect(() => {
    if (filtersData && filtersData.features) {
      filtersData.features = { ...filtersData.features, open: filtersData.features.values.some(x=>x.selected)  }
    }

    if (filtersData && filtersData.cid) {
      filtersData.cid = { ...filtersData.cid, open: filtersData.cid.values.some(x=>x.selected) }
    }
    if (filtersData && filtersData.attr) {
      filtersData.attr = {
        ...filtersData.attr,
        open: filtersData.attr.values.some(x=>x.selected),
        values: filtersData.attr.values.map((x) => {
          return { ...x, open: x.selected }
        }),
      }
    }
    setTempState(filtersData)
  }, [filtersData])

  


  const onShowCidNext = () =>{ 
    if(tempState?.cid ){ 
      setCidPaginate({startIndex:0, endIndex:tempState.cid.values.length-1})
    }
  }
  const onShowCidPrev = ()=> { 
    if(tempState?.cid ){ 
      setCidPaginate({startIndex:0, endIndex:10})
    }
  }

  const [regionsPagination, setRegionsPagination] = useState({
    offset: 0,
    limit: REGION_PAGE_SIZE,
  })



  const handlePaginateRegions = (direction: any) => {
    if (direction > 0) {
      setRegionsPagination((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }))
    } else if (direction < 0) {
      setRegionsPagination((prev) => ({
        ...prev,
        offset: Math.max(prev.offset - prev.limit, 0),
      }))
    }
  }



  useEffect(()=>{ 
    if(attrValue.length>0){ 
      handleFilterChange({attr: attrValue.join(";")})
    }

  }, [attrValue])

  //   onChange={(val) => handleChange({ [name]: { val, tag: "max" } })} />

  return (
    <div className="flex space-x-1">
      <FilterDropdownContainer
        submitFilters={submitFilters}
        clearFilters={clearFilters}
        triggerElement={
          <Button
            icon={<FilterIcon size={20} style={{ marginTop: "4px" }} />}
            className="mr-2 flex  flex-row items-center justify-center px-6"
            variant="secondary"
            size="small"
            spanClassName="text-center text-sm font-small text-slate-700"
          >
            Filter
          </Button>
        }
      >
        {tempState?.cid && (
          <FilterDropdownItem
            hasMore={tempState?.cid.values.length > cidPaginate.endIndex +1 }
            hasPrev={cidPaginate.endIndex === tempState.cid.values.length-1 }
            onShowNext={onShowCidNext}
            onShowPrev={onShowCidPrev}
            filterTitle={tempState?.cid.title}
            options={
              tempState?.cid.values.slice(cidPaginate.startIndex, cidPaginate.endIndex).map((f) => ({
                value: f.value,
                label: f.label,
              })) || []
            }
            filters={tempState?.cid.values
              .filter((x) => x.selected)
              .map((x) => x.value)}
            open={tempState.cid.open}
            setFilter={(val:{open:boolean; filter:string[]}) => {
              
              handleFilterChange({cid: val.filter[val.filter.length-1]})
              if (filtersData && filtersData.cid) {
                //  @ts-ignore
                setTempState((prevState) => ({
                  ...prevState,
                  cid: { ...prevState?.cid, open: val.open },
                }))
              }
            }}
          />
        )}

        <FilterDropdownItem
          filterTitle={tempState?.features.title}
          options={
            tempState?.features.values?.map((f) => ({
              value: f.value,
              label: f.label,
            })) || []
          }
          filters={tempState?.features.values
            ?.filter((x) => x.selected)
            .map((x) => x.value)}
          open={tempState?.features.open}
          setFilter={(val:{open:boolean; filter:string[]}) => {
            if (filtersData && filtersData.features) {
              handleFilterChange({features: val.filter.join(',')})
              //  @ts-ignore
              setTempState((prevState) => ({
                ...prevState,
                features: { ...prevState?.features, open: val.open },
              }))
            }
          }}
        />
        {tempState?.attr.values.map((x, index) => {
          return (
            <FilterDropdownItem
              filterTitle={x.label}
              options={
                x.values?.map((f) => ({
                  value: f.value,
                  label: f.label,
                })) || []
              }
              filters={x.values?.filter((x) => x.selected).map((x) => x.value)}
              open={x.open}
              setFilter={(val:{open:boolean; filter:string[]}) => {
                if (filtersData && filtersData.attr) {

                  setAttrValue((pre)=>{ 
                    return [...pre, ...val.filter]


                  })
                  //  @ts-ignore
                  setTempState((prevState) => {
                    const attr = prevState?.attr
                    if (!attr) {
                      return prevState // Return the unchanged state if 'attr' is undefined
                    }

                    const values = attr.values || []
                    const updatedValues = [...values] // Create a copy of the values array
                    if (index >= 0 && index < updatedValues.length) {
                      updatedValues[index] = {
                        ...updatedValues[index],
                        open: val.open, // Update the 'open' field of the object at the specified index
                      }
                    }

                    return {
                      ...prevState,
                      attr: {
                        ...attr,
                        values: updatedValues, // Update the 'values' array with the modified version
                      },
                    }
                  })
                }
              }}
            />
          )
        })}
      </FilterDropdownContainer>
    </div>
  )
}

export default InventoryProductFilters
