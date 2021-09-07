using STC.Common.Requests;
using STC.Common.Responses;
using STC.Data;
using STC.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace STC.Core.Stores
{
    public class MedicalStore
    {
        private readonly STCDbContext _dbContext;

        public MedicalStore(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public CandidateMedicalDataResponse GetCandidateMedicalData(string cnic)
        {
            CandidateMedicalDataResponse response = new CandidateMedicalDataResponse();
            Candidate candidate = _dbContext.Candidates.First(x => x.Cnic == cnic);
            CandidateHasCourse candidateHasCourse = _dbContext.CandidateHasCourses.First(x => x.CandidateCnic == cnic && x.CourseId == 1);
            CandidateMedicalInfo candidateMedicalInfo = _dbContext.CandidateMedicalInfos.OrderBy(x => x.Id).Last(x => x.CandidateCnic == cnic);
            response.RegistrationNo = candidateHasCourse.RegistrationNumber;
            response.Name = candidate.FirstName + ' ' + candidate.MiddleName + ' ' + candidate.LastName;
            response.Height = candidateMedicalInfo.Height;
            response.Chest = new Common.Requests.ChestSize()
            {
                Chest0 = candidateMedicalInfo.ChestIn,
                Chest1 = candidateMedicalInfo.ChestOut
            };
            response.Weight = candidateMedicalInfo.Weight;
            response.Temperature = candidateMedicalInfo.Temperature.GetValueOrDefault();
            response.PulseRate = candidateMedicalInfo.PulseRate.GetValueOrDefault();
            response.BloodPressure = new Common.Requests.BloodPressure()
            {
                Bp0 = candidateMedicalInfo.BPLow.GetValueOrDefault(),
                Bp1 = candidateMedicalInfo.BPHigh.GetValueOrDefault()
            };
            response.MedicalStatusUpdate = candidateMedicalInfo.FinalStatus;
            response.Remarks = candidateMedicalInfo.Remarks;
            response.CommentsByRMO = candidateMedicalInfo.CommentsByRmo;
            response.Status = candidateMedicalInfo.StatusUpdate;
            return response;
        }

        public bool UpdateCandidateMedicalData(string cnic, UpdateCandidateMedicalDataRequest request)
        {
            CandidateMedicalInfo candidateMedicalInfo = new CandidateMedicalInfo()
            {
                CandidateCnic = cnic,
                CourseId = 1,
                Height = request.CandidateMedicalData.Height,
                ChestIn = request.CandidateMedicalData.Chest.Chest0,
                ChestOut = request.CandidateMedicalData.Chest.Chest1,
                Weight = request.CandidateMedicalData.Weight,
                Temperature = request.CandidateMedicalData.Temperature,
                PulseRate = request.CandidateMedicalData.PulseRate,
                BPLow = request.CandidateMedicalData.BloodPressure.Bp0,
                BPHigh = request.CandidateMedicalData.BloodPressure.Bp1,
                FinalStatus = request.CandidateMedicalData.MedicalStatusUpdate,
                Remarks = request.CandidateMedicalData.Remarks,
                CommentsByRmo = request.CandidateMedicalData.CommentsByRMO,
                StatusUpdate = request.CandidateMedicalData.Status
            };
            _dbContext.CandidateMedicalInfos.Add(candidateMedicalInfo);
            _dbContext.SaveChanges();
            return true;
        }
    }
}
