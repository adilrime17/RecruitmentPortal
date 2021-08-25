// import axios from "axios";

// export default class API {
//     static Login = (username, password) => {
//         return axios.post('authentication/login', {
//             username,
//             password
//         });
//     }

//     static GetAllDistricts = () => {
//         return axios.get('data/districts');
//     }

//     static GetAllLocationClasses = () => {
//         return axios.get('data/location_classes');
//     }

//     static GetAllQualifications = () => {
//         return axios.get('data/qualifications');
//     }

//     static GetCandidateDetails = (cnic) => {
//         return axios.get('candidate/get/' + cnic);
//     }

//     static AddCandidate = (candidate) => {
//         return axios.post('candidate/add', candidate);
//     }
// }

import axios from 'axios'
const baseURL =  "http://localhost:5000/api"

export default class API {
  // get
  static getAllDistricts = () => {
    return axios.get(`${baseURL}/district`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     districtList: [
    //       {
    //         id: 0,
    //         label: "Islamabad",
    //       },
    //       {
    //         id: 1,
    //         label: "Rawalpindi",
    //       },
    //     ],
    //   });
    // });
  };

  // get
  static getAllLocationClasses = () => {
    return axios.get(`${baseURL}/locationclass`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     locationClassesList: [
    //       {
    //         id: 0,
    //         label: "Punjab",
    //       },
    //       {
    //         id: 1,
    //         label: "Gilgit Baltistan",
    //       },
    //     ],
    //   });
    // });
  };

  // get
  static getAllQualifications = () => {
    return axios.get(`${baseURL}/education/max_qualification`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     qualificationsList: [
    //       {
    //         id: 0,
    //         label: "Under Matric",
    //       },
    //       {
    //         id: 1,
    //         label: "Matric",
    //       },
    //     ],
    //   });
    // });
  };

  static getQualificationLevel = () => {
    return axios.get(`${baseURL}/education/level`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     qualificationsList: [
    //       {
    //         id: 0,
    //         label: "Under Matric",
    //       },
    //       {
    //         id: 1,
    //         label: "Matric",
    //       },
    //     ],
    //   });
    // });
  };

  static getQualificationDegree = () => {
    // return axios.get(`${baseURL}/education/level`)
    return new Promise((resolve, reject) => {
      resolve({
        qualificationsList: [
          {
            id: 0,
            label: "Under Matric",
          },
          {
            id: 1,
            label: "Matric",
          },
        ],
      });
    });
  };

  // get -- on the base of qualification id
  static getQualificationMajorList = (qualificationId) => {
    return new Promise((resolve, reject) => {
      resolve({
        majorsList: [
          {
            id: 0,
            label: "Science",
          },
          {
            id: 1,
            label: "Technology",
          },
        ],
      });
    });
  };

  // get -- on the base of qualification and major id
  static getQualificationMajorSubjectList = (qualificationId, majorId) => {
    return new Promise((resolve, reject) => {
      resolve({
        majorSubjectsList: [
          {
            id: 0,
            label: "Science",
          },
          {
            id: 1,
            label: "Technology",
          },
        ],
      });
    });
  };

  // get with cnic in url
  static getCandidateDetails = (cnic) => {
    return axios.get(`${baseURL}/candidate/${cnic}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     candidateData: {
    //       svasXmatch: false,
    //       ncse: false,
    //       registrationNo: "sp123-123",
    //       firstName: "John",
    //       middleName: "Li",
    //       lastName: "Doe",
    //       fatherName: "John John",
    //       district: "",
    //       locationClass: "",
    //       dateOfBirth: "1995-12-17T03:24:00",
    //       contactNo: "123123123",
    //       guardianContactNo: "123123123",
    //       maxQualification: "Bachelor",
    //       woa: false,
    //       wos: false,
    //       dlh: false,
    //       dit: false,
    //       hafiz: false,
    //       height: 20,
    //       chest: {
    //         chest0: 20,
    //         chest1: 40,
    //       },
    //       weight: 60,
    //     },
    //   });
    // });
  };

  // post
  // also if eligible then add candidate data into db.
  static checkCandidateEligibility = (data) => {
    return axios.post(`${baseURL}/candidate/check_eligibility`, data)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     candidateEligible: true,
    //     updated: "Successfully",
    //   });
    // });
  };

  // post - for personal data page
  static updateCandidateData = (cnic, candidateData) => {
    return new Promise((resolve, reject) => {
      resolve({
        updated: "Successfully",
      });
    });
  };

  // get
  static getCandidateEducationalData = (cnic) => {
    return axios.get(`${baseURL}/candidate/${cnic}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     registrationNo: "sp121212-12",
    //     ncse: false,
    //     maxQualification: "Bachelor",
    //     candidateEducationalData: [
    //       {
    //         level: "Matric",
    //         degree: 'hhhh',
    //         major: "S",
    //         subject: "S",
    //         obtained: 80,
    //         total: 100,
    //         grade: "A",
    //       },
    //       {
    //         level: "Matric",
    //         degree: 'hhhh',
    //         major: "S",
    //         subject: "S",
    //         obtained: 80,
    //         total: 100,
    //         grade: "A",
    //       },
    //     ],
    //   });
    // });
  };

  static updateCandidateEducationalData = (cnic, candidateEducationalData) => {
    return new Promise((resolve, reject) => {
      resolve({
        updated: "Successfully",
      });
    });
  };

  static getCandidateWoaWosData = (cnic) => {
    return new Promise((resolve, reject) => {
      resolve({
        candidateWoaWosData: {
          registrationNo: "sp121212-12",
          woa: false,
          wos: false,
          armyNo: "123",
          name: "john",
          fatherName: "doe",
          unit: "1",
          corps: "2",
          contact: "123123123",
          dod: "22",
        },
      });
    });
  };

  static updateCandidateWoaWosData = (cnic, candidateWoaWosData) => {
    return new Promise((resolve, reject) => {
      resolve({
        updated: "Successfully",
      });
    });
  };

  static getCandidateTestsToAppear = (cnic) => {
    return new Promise((resolve, reject) => {
      resolve({
        testsToAppear: {
          registrationNo: "sp121212-12",
          personality: false,
          intelligence: false,
          writtenMatric: false,
          writtenUnderMatric: false,
          clerk: false,
          tech: false,
          dit: false,
          dlh: false,
          hafiz: false,
          pet: false,
        },
        chargesPaid: false,
      });
    });
  };

  static updateCandidateTestsToAppear = (cnic, testsToAppear, chargesPaid) => {
    return new Promise((resolve, reject) => {
      resolve({
        updated: "Successfully",
      });
    });
  };

  // if charges Paid is false then this will return
  // slipDetails: 'Charges not paid'
  static getCandidatePrintTestSlip = (cnic) => {
    return new Promise((resolve, reject) => {
      resolve({
        registrationNo: "sp23123123",
        slipDetails: [
          {
            test: "Initial Test",
            day: "Monday, June 15, 2009 1:45 PM",
          },
          {
            test: "Personality Test",
            day: "Monday, June 15, 2009 1:45 PM",
          },
          {
            test: "Hafiz Test",
            day: "Monday, June 15, 2009 1:45 PM",
          },
        ],
      });
    });
  };

  static getCandidatesSummary = (date) => {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            registrationNo: "sp12-2121",
            name: "John Doe",
            fathersName: "Doe John",
            district: "Rawalpindi",
            date: "Monday, June 15, 2009 1:45 PM",
            amountPaid: "500",
          },
          {
            registrationNo: "sp12-2121",
            name: "John Doe",
            fathersName: "Doe John",
            district: "Rawalpindi",
            date: "Monday, June 15, 2009 1:45 PM",
            amountPaid: "500",
          },
          {
            registrationNo: "sp12-2121",
            name: "John Doe",
            fathersName: "Doe John",
            district: "Rawalpindi",
            date: "Monday, June 15, 2009 1:45 PM",
            amountPaid: "500",
          },
        ],
      });
    });
  };

  // intelligence = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // personality = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // writtenMatric = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // writtenUnderMatric = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // clerk = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // tech = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // dit = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // dlh = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: '40',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // hafiz = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	result: 'Fail',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // pet = {
  // 	registrationNo: '123',
  // 	name: 'john',
  // 	totalPetObtained: '5',
  // 	oneMile: '1',
  // 	pullUp: '2',
  // 	pushUp: '2',
  // 	crunches: '3',
  // 	ditch: 'clear',
  // 	todayFail: '2',
  // 	totalFail: '100',
  // 	todayPass: '5',
  // 	totalPass: '100'
  // }

  // test name could be intelligence, personality, writtenMatric, writtenUnderMatric, clerk, tech, dit, dlh, hafiz, pet
  static getCandidateTestDetail = (cnic, testName) => {
    return new Promise((resolve, reject) => {
      resolve({
        candidateTestDetail: {
          registrationNo: "123",
          name: "john",
          result: "40",
          todayFail: "2",
          totalFail: "100",
          todayPass: "5",
          totalPass: "100",
        },
      });
    });
  };

  static updateCandidateTestMarks = (cnic, testResults, testName) => {
    return new Promise((resolve, reject) => {
      resolve({
        updated: "successfully",
      });
    });
  };

  static getCandidateMarksSummary = (cnic) => {
    return new Promise((resolve, reject) => {
      resolve({
        candidateMarksSummary: {
          registrationNo: "123",
          name: "john",
          district: "Rawalpindi",
          personality: "Unsuitable",
          initial: "20",
          written: "30",
          dlh: "Fail",
          dit: "Fail",
          pet: "Fail",
          sponser: "Name here",
          woswoa: "Verified",
          clerk: "20",
          tech: "30",
          hafiz: "Fail",
          medicalStatus: "FIT", // Ref - Muf
        },
      });
    });
  };

  static updateCandidateMarksSummary = (cnic, candidateMarksSummary) => {
    return new Promise((resolve, reject) => {
      resolve({
        updated: "Successfully",
      });
    });
  };

  // static getMedicalStatusUpdate = () => {
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       medicalStatusUpdate: [
  //         "FIT by RMO",
  //         "UNFIT By RMO (Reason fetched from template)",
  //         "TUF (Reason)",
  //         "Referred to Specialist (Incl type of specialist from referrals)",
  //         "UNFIT by ______ Specialist in __________.",
  //       ],
  //     });
  //   });
  // };

  static getCandidateMedical = (cnic) => {
    return new Promise((resolve, reject) => {
      resolve({
        candidateMedicalData: {
          registrationNo: "123",
          name: "john",
          height: 20,
          chest: {
            chest0: 20,
            chest1: 40,
          },
          weight: 60,
          temperature: 20,
          pulseRate: "20/30",
          bloodPressure: {
            bp0: 20,
            bp1: 40,
          },
          medicalStatusUpdate: "Fit By RMO",
          remarks: "new remarks",
          commentsByRMO: "comments here",
          addedDeformityList: [
            {
              id: 1,
              label: "Lid Swelling",
            },
            {
              id: 2,
              label: "Bone Fracture",
            },
          ],
          someVisibleDeformity: false,
        },
      });
    });
  };

  // update candidate medical data with medical fit true or false
  static updateCandidateMedical = (
    cnic,
    candidateMedicalData,
    medicallyFit
  ) => {
    return new Promise((resolve, reject) => {
      resolve({
        updated: "Successfully",
      });
    });
  };
}
