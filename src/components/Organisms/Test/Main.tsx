import React, { FormEvent, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../../../contexts/UserContext';
import { ValueType } from '../../../types';
import { LoginDto } from '../../../types/services/auth.types';
import Details from "../../Molecules/custom/Details";
import Checkbox from '../../Atoms/Form/Checkbox';
import Input from '../../Atoms/Form/Input';
import Button from '../../Molecules/Button/Button';

export default function SignInForm() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [location, setLocation] = useState<any>({});
  useEffect(() => {
    if (user) {
      setLocation(user.data);
    }

  }, [user]);

  let basicInfo = {},
    locationInfo = {},
    otherInfo = {}

  if (location?.location) {
    console.log('test', location)
    basicInfo = {
      Name: location.location.name,
      Address: `${location.location.zip}, ${location.location.city}, ${location.location.country}`,
      Street: location.location.street,
      State: location.location.state,
      Phone: location.location.phone,
      Website: location.location.website
    }
    locationInfo = {
      Latitude: location.location.lat,
      Longitude: location.location.lon,
      Distance: location.location.distance,
      Bearing: location.location.bearing
    }
    otherInfo = Object.assign({}, location.location.machine_names);
  }

  return (
    <div>
      {
        location.errors ?
          <p>{location.errors}</p> :
          location.location ?
            <div className="row">
              <div className="col-12 col-md-6">
                <Details title="Personal Information" data={basicInfo} />
              </div>

              <div className="col-12 col-md-6">
                <Details title="Location Information" data={locationInfo} />
              </div>

              <div className="col-12 col-md-6">
                <Details title="Other Information" data={otherInfo} />
              </div>
            </div> : null
      }
    </div>
  );
}
