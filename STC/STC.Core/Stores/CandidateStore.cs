using STC.Common.Requests;
using STC.Common.Responses;
using STC.Data;
using STC.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using STC.Common.MiscUtil;
using STC.Core.EligibilityCheck;

namespace STC.Core.Stores
{
    public class CandidateStore
    {
        private readonly STCDbContext _dbContext;
        private readonly IEligibilityCheckService _eligibilityCheckService;

        public CandidateStore(STCDbContext dbContext, IEligibilityCheckService eligibilityCheckService)
        {
            _dbContext = dbContext;
            _eligibilityCheckService = eligibilityCheckService;
        }

        public CandidateResponse GetDetails(string cnic)
        {
            return _dbContext.Candidates
                .Where(x => x.Cnic == cnic)
                .Select(x => new CandidateResponse()
                {
                    Cnic = x.Cnic,
                    Ncse = x.NCSE,
                    RegistrationNo = x.CandidateHasCourses.Count > 0 ? x.CandidateHasCourses.First().RegistrationNumber : "",
                    SvasXmatch = x.SvasXmatch.HasValue ? x.SvasXmatch.Value : false,
                    FirstName = x.FirstName,
                    MiddleName = x.MiddleName,
                    LastName = x.LastName,
                    FatherName = x.FatherName,
                    District = x.District.Name,
                    LocationClass = x.LocationClass.Name,
                    DateOfBirth = x.DateOfBirth,
                    ContactNo = x.ContactPhone,
                    GuardianContactNo = x.GuardianPhone,
                    MaxQualification = x.MaxQualification.Name,
                    Woa = x.WOA,
                    Wos = x.WOS,
                    Dlh = x.DLH,
                    Dit = x.DIT,
                    Hafiz = x.Hafiz,
                    Height = x.CandidateMedicalInfos.LastOrDefault().Height,
                    Chest = new ChestSize()
                    {
                        Chest0 = x.CandidateMedicalInfos.LastOrDefault().ChestIn,
                        Chest1 = x.CandidateMedicalInfos.LastOrDefault().ChestOut
                    },
                    Weight = x.CandidateMedicalInfos.LastOrDefault().Weight
                })
                .FirstOrDefault();
        }

        public CheckEligibilityResponse CheckEligibility(CandidateCreateRequest request)
        {
            Candidate candidate = _dbContext.Candidates.FirstOrDefault(x => x.Cnic == request.Cnic);
            if (candidate == null)
            {
                candidate = new Candidate();
                candidate.MiddleName = "";
                ((object)request).CopyProperties(candidate);
                _dbContext.Candidates.Add(candidate);
                _dbContext.SaveChanges();
            }
            // perform eligibility check and return
            bool check = _eligibilityCheckService.Check(candidate, request.Ncse);
            CandidateHasCourse candidateHasCourse = candidate.CandidateHasCourses.FirstOrDefault(x => x.CourseId == 1);
            if (candidateHasCourse == null)
            {
                candidateHasCourse = new CandidateHasCourse()
                {
                    CandidateCnic = candidate.Cnic,
                    CourseId = 1,
                    Status = _dbContext.Statuses.First(x => x.Id == (check ? "eligible" : "non-eligible"))
                };
                _dbContext.CandidateHasCourses.Add(candidateHasCourse);
                _dbContext.SaveChanges();
            }

            return new CheckEligibilityResponse()
            {
                CandidateEligible = check,
                RegistrationNo = _dbContext.Courses.First(x => x.Id == 1).Name + "-" + candidateHasCourse.CandidateCnic + "-" + candidateHasCourse.CourseId
            };
        }

        public bool UpdateData(string cnic, CandidateUpdateRequest request)
        {
            Candidate candidate = _dbContext.Candidates.FirstOrDefault(x => x.Cnic == cnic);
            request.CopyProperties(candidate);
            return _dbContext.SaveChanges() > 0;
        }
    }
}
