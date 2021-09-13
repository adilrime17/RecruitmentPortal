import axios from 'axios'
// const baseURL =  "http://192.168.15.77:5000/api"
const baseURL =  "http://localhost:5000/api"

export default class API {
  static getAllDistricts = () => {
    // return axios.get(`${baseURL}/district`)
    return axios.get(`${baseURL}/district`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
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
    // return axios.get(`${baseURL}/locationclass`)
    return axios.get(`${baseURL}/locationclass`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
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
    //     data: [
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

  

  // get with cnic in url
  static getCandidateDetails = (cnic) => {
    return axios.get(`${baseURL}/candidate/${cnic}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: {
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
  static updateCandidateData = (cnic, data) => {
    return axios.put(`${baseURL}/candidate/${cnic}`, data)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     updated: "Successfully",
    //   });
    // });
  };


  static getCandidateEducationalData = (cnic) => {
    return axios.get(`${baseURL}/education/candidate/${cnic}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //   data: {
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
    //   }});
    // });
  };


  static getQualificationLevel = () => {
    return axios.get(`${baseURL}/education/level`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
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

  static getQualificationDegree = (id) => {
    return axios.get(`${baseURL}/education/level/${id}/degree`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         id: 0,
    //         label: "hello",
    //       },
    //       {
    //         id: 1,
    //         label: "world",
    //       },
    //     ],
    //   });
    // });
  };

  static getQualificationMajorList = (id) => {
    return axios.get(`${baseURL}/education/level/${id}/major`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         id: 0,
    //         label: "Science",
    //       },
    //       {
    //         id: 1,
    //         label: "Technology",
    //       },
    //     ],
    //   });
    // });
  };

  static getQualificationMajorSubjectList = (id) => {
    return axios.get(`${baseURL}/education/major/${id}/subject`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         id: 0,
    //         label: "Science",
    //       },
    //       {
    //         id: 1,
    //         label: "Technology",
    //       },
    //     ],
    //   });
    // });
  };

  

  static updateCandidateEducationalData = (cnic, candidateEducationalData) => {
    return axios.put(`${baseURL}/education/candidate/${cnic}`, {
      candidateEducationalData: candidateEducationalData
    })
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     updated: "Successfully",
    //   });
    // });
  };

  static getCandidateWoaWosData = (cnic) => {
    // return axios.get(`${baseURL}​/candidate​/${cnic}​/army_data`)
    return axios.get(`${baseURL}/candidate/${cnic}/army_data`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: {
    //       registrationNo: "sp121212-12",
    //       woa: false,
    //       wos: false,
    //       armyNo: "123",
    //       name: "john",
    //       fatherName: "doe",
    //       unit: "1",
    //       corps: "2",
    //       contact: "123123123",
    //       dod: "22",
    //     },
    //   });
    // });
  };

  static updateCandidateWoaWosData = (cnic, data) => {
    // return axios.put(`${baseURL}/candidate​/${cnic}​/army_data`, data)
    return axios.put(`${baseURL}/candidate/${cnic}/army_data`, data)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     updated: "Successfully",
    //   });
    // });
  };

  static getCandidateTestsToAppear = (cnic) => {
    // return axios.get(`${baseURL}/tests​/${cnic}`)
    return axios.get(`${baseURL}/tests/${cnic}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     testsToAppear: {
    //       registrationNo: "sp121212-12",
    //       personality: false,
    //       intelligence: false,
    //       writtenMatric: false,
    //       writtenUnderMatric: false,
    //       clerk: false,
    //       tech: false,
    //       dit: false,
    //       dlh: false,
    //       hafiz: false,
    //       pet: false,
    //     },
    //     chargesPaid: false,
    //   });
    // });
  };

  static updateCandidateTestsToAppear = (cnic, data) => {
    // return axios.put(`${baseURL}/tests​/${cnic}`, data)
    return axios.put(`${baseURL}/tests/${cnic}`, data)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     updated: "Successfully",
    //   });
    // });
  };

  // if charges Paid is false then this will return
  // slipDetails: 'Charges not paid'
  static getCandidatePrintTestSlip = (cnic) => {
    // return axios.get(`${baseURL}​/tests​/${cnic}​/slip`)
    return axios.get(`${baseURL}/tests/${cnic}/slip`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     registrationNo: "sp23123123",
    //     slipDetails: [
    //       {
    //         test: "Initial Test",
    //         day: "Monday, June 15, 2009 1:45 PM",
    //       },
    //       {
    //         test: "Personality Test",
    //         day: "Monday, June 15, 2009 1:45 PM",
    //       },
    //       {
    //         test: "Hafiz Test",
    //         day: "Monday, June 15, 2009 1:45 PM",
    //       },
    //     ],
    //   });
    // });
  };

  static getCandidatesSummary = (date) => {
    // return axios.get(`${baseURL}​/candidate/summary`)
    return axios.get(`${baseURL}/candidate/summary/${date}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         registrationNo: "sp12-2121",
    //         name: "John Doe",
    //         fathersName: "Doe John",
    //         district: "Rawalpindi",
    //         date: "Monday, June 15, 2009 1:45 PM",
    //         amountPaid: "500",
    //       },
    //       {
    //         registrationNo: "sp12-2121",
    //         name: "John Doe",
    //         fathersName: "Doe John",
    //         district: "Rawalpindi",
    //         date: "Monday, June 15, 2009 1:45 PM",
    //         amountPaid: "500",
    //       },
    //       {
    //         registrationNo: "sp12-2121",
    //         name: "John Doe",
    //         fathersName: "Doe John",
    //         district: "Rawalpindi",
    //         date: "Monday, June 15, 2009 1:45 PM",
    //         amountPaid: "500",
    //       },
    //     ],
    //   });
    // });
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
    // return axios.get(`${baseURL}​/tests​/${cnic}​/${testName}`)
    return axios.get(`${baseURL}/tests/${cnic}/${testName}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: {
    //       registrationNo: "123",
    //       name: "john",
    //       marksObtained: "40",
    //       todayFail: "2",
    //       totalFail: "100",
    //       todayPass: "5",
    //       totalPass: "100",
    //     },
    //   });
    // });
  };

  static updateCandidateTestMarks = (cnic, testResults, testName) => {
    // return axios.put(`${baseURL}​​/tests​/${cnic}​/${testName}`, testResults)
    return axios.put(`${baseURL}/tests/${cnic}/${testName}`, testResults)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     updated: "successfully",
    //   });
    // });
  };

  static getCandidateMarksSummary = (cnic) => {
    // return axios.get(`${baseURL}/tests​/${cnic}​/summary`)
    return axios.get(`${baseURL}/tests/${cnic}/summary`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: {
    //       registrationNo: "123",
    //       name: "john",
    //       district: "Rawalpindi",
    //       personality: "Unsuitable",
    //       initial: "20",
    //       written: "30",
    //       dlh: "Fail",
    //       dit: "Fail",
    //       pet: "Fail",
    //       sponser: "Name here",
    //       woswoa: "Verified",
    //       clerk: "20",
    //       tech: "30",
    //       hafiz: "Fail",
    //       medicalStatus: "FIT", // Ref - Muf
    //     },
    //   });
    // });
  };

  static updateCandidateMarksSummary = (cnic, data) => {
    // return axios.put(`${baseURL}/tests​/${cnic}​/summary`, data)
    return axios.put(`${baseURL}/tests/${cnic}/summary`, data)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     updated: "Successfully",
    //   });
    // });
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

    // return axios.put(`${baseURL}/tests/${cnic}/summary`, data)
    return axios.get(`${baseURL}/medical/${cnic}`)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     candidateMedicalData: {
    //       registrationNo: "123",
    //       name: "john",
    //       height: 20,
    //       chest: {
    //         chest0: 20,
    //         chest1: 40,
    //       },
    //       weight: 60,
    //       temperature: 20,
    //       pulseRate: "20/30",
    //       bloodPressure: {
    //         bp0: 20,
    //         bp1: 40,
    //       },
    //       medicalStatusUpdate: "Fit By RMO",
    //       remarks: "new remarks",
    //       commentsByRMO: "comments here",
    //       addedDeformityList: [
    //         {
    //           id: 1,
    //           label: "Lid Swelling",
    //         },
    //         {
    //           id: 2,
    //           label: "Bone Fracture",
    //         },
    //       ],
    //       someVisibleDeformity: false,
    //     },
    //   });
    // });
  };

  // update candidate medical data with medical fit true or false
  static updateCandidateMedical = (
    cnic,
    data
  ) => {
    return axios.put(`${baseURL}/medical/${cnic}`, data)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     updated: "Successfully",
    //   });
    // });
  };
}
