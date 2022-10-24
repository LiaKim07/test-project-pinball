import React, { useEffect, useState } from 'react';

import { SelectData, ValueType } from '../../../types';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Icon from '../../Atoms/Icon';
interface IProps<T> {
    data?: T;
    handleFilter: (_val: any) => void;
}
const defaultState: any = {
    country: '',
    startDate: '',
    endDate: '',
};

export default function DateFilter<T>({ data, handleFilter }: IProps<T>) {
    const [filter, setfilter] = useState<any>({});
    const [values, setvalues] = useState<any>({ ...defaultState });
    const [type1, setType1] = useState<string>('text');
    const [type2, setType2] = useState<string>('text');

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };
    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('text')
        }
    }

    const onBlurtype2 = (e: any) => {
        if (e.target.value === "") {
            setType2('text')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('date')
    }

    const onFocus2 = (e: any) => {
        setType2('date')
    }

    useEffect(() => {
        handleFilter(filter);
    }, [filter]);

    const colOptions = [
        {
            "id": "id1",
            'name': "Lithuania"
        },
        {
            "id": "id2",
            'name': "Ukraine"
        },
        {
            "id": "id3",
            'name': "Turkey"
        },
    ]

    // reset filter
    const handleResetFilter = () => {
        setfilter(values);
    };

    return (
        <div className="py-4">
            <div className="col-12 col-lg-12">
                <div className="border row py-2 bg-almost-white">
                    <div className="col-6 col-md-3">
                        <CustomSelect
                            name="country"
                            handleChange={handleChange}
                            placeholder="Country"
                            value={values.country}
                            options={
                                colOptions.map((n) => ({
                                    value: n.name,
                                    label: n.name,
                                })) as SelectData[]
                            }
                        />
                    </div>
                    <div className="col-6 col-md-3">
                        <Input
                            className="mr-3"
                            type={type1}
                            onFocus={onFocus1}
                            onBlur={onBlurtype1}
                            name="startDate"
                            handleChange={handleChange}
                            placeholder="Date from *"
                            value={values.startDate}
                        />
                    </div>
                    <div className="col-6 col-md-3">
                        <Input
                            className="mr-3"
                            type={type2}
                            onFocus={onFocus2}
                            onBlur={onBlurtype2}
                            name="endDate"
                            handleChange={handleChange}
                            placeholder="Date until *"
                            value={values.endDate}
                        />
                    </div>
                    <div className="col-6 col-md-3">
                        <button
                            className="w-auto btn text-xs text-capitalize reset-btn"
                            onClick={handleResetFilter}>
                            Generate summary &nbsp;
                            <span className="ml-1 bg-light-gray rounded-circle">
                                <Icon name="setting" size={26} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
