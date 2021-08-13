import axios from "axios";

export default class API {
    static Login = (username, password) => {
        return axios.post('authentication/login', {
            username,
            password
        });
    }

    static GetAllDistricts = () => {
        return axios.get('data/districts');
    }

    static GetAllLocationClasses = () => {
        return axios.get('data/location_classes');
    }

    static GetAllQualifications = () => {
        return axios.get('data/qualifications');
    }

    static GetCandidateDetails = (cnic) => {
        return axios.get('candidate/get/' + cnic);
    }

    static AddCandidate = (candidate) => {
        return axios.post('candidate/add', candidate);
    }
}
