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
using Microsoft.EntityFrameworkCore;

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
                    Height = x.CandidateMedicalInfos.OrderBy(y => y.Id).LastOrDefault().Height,
                    Chest = new ChestSize()
                    {
                        Chest0 = x.CandidateMedicalInfos.OrderBy(y => y.Id).LastOrDefault().ChestIn,
                        Chest1 = x.CandidateMedicalInfos.OrderBy(y => y.Id).LastOrDefault().ChestOut
                    },
                    Weight = x.CandidateMedicalInfos.OrderBy(y => y.Id).LastOrDefault().Weight
                })
                .FirstOrDefault();
        }

        public CheckEligibilityResponse CheckEligibility(CandidateCreateRequest request)
        {
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateMedicalInfos).FirstOrDefault(x => x.Cnic == request.Cnic);
            if (candidate == null)
            {
                candidate = new Candidate();
                candidate.Cnic = request.Cnic;
                candidate.DistrictId = _dbContext.Districts.First(x => x.Name == request.District).Id;
                candidate.LocationClassId = _dbContext.LocationClasses.First(x => x.Name == request.LocationClass).Id;
                candidate.MaxQualificationId = _dbContext.Qualifications.First(x => x.Name == request.MaxQualification).Id;
                candidate.NCSE = request.Ncse;
                candidate.FirstName = request.FirstName;
                candidate.MiddleName = request.MiddleName;
                candidate.LastName = request.LastName;
                candidate.FatherName = request.FatherName;
                candidate.DateOfBirth = request.DateOfBirth;
                candidate.WOS = request.Wos;
                candidate.WOA = request.Woa;
                candidate.DLH = request.Dlh;
                candidate.DIT = request.Dit;
                candidate.Hafiz = request.Hafiz;
                CandidateMedicalInfo candidateMedicalInfo = new CandidateMedicalInfo();
                candidateMedicalInfo.CourseId = 1;
                candidateMedicalInfo.ChestIn = request.Chest.Chest0;
                candidateMedicalInfo.ChestOut = request.Chest.Chest1;
                candidateMedicalInfo.Weight = request.Weight;
                candidateMedicalInfo.Height = request.Height;
                candidate.CandidateMedicalInfos.Add(candidateMedicalInfo);
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
                    RegistrationNumber = _dbContext.Courses.First(x => x.Id == 1).Name + "-" + candidate.Cnic + "-" + 1,
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

        public CandidateArmyDataResponse GetArmyData(string cnic)
        {
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateArmyInfo).First(x => x.Cnic == cnic);
            return new CandidateArmyDataResponse()
            {
                ArmyNo = candidate.CandidateArmyInfo.ArmyNumber,
                Name = candidate.FirstName + ' ' + candidate.MiddleName + ' ' + candidate.LastName,
                FatherName = candidate.FatherName,
                Unit = candidate.CandidateArmyInfo.Unit,
                Corps = candidate.CandidateArmyInfo.Corps,
                Contact = candidate.GuardianPhone,
                Dod = candidate.CandidateArmyInfo.DOD.ToString()
            };           
        }

        public bool UpdateArmyData(string cnic, CandidateArmyDataRequest request)
        {
            CandidateArmyInfo armyInfo = _dbContext.CandidateArmyInfos.FirstOrDefault(x => x.CandidateCnic == cnic);
            if(armyInfo == null)
            {
                armyInfo = new CandidateArmyInfo()
                {
                    CandidateCnic = cnic,
                    ArmyNumber = request.ArmyNo,
                    Unit = request.Unit,
                    Corps = request.Corps
                };
                if(!string.IsNullOrEmpty(request.Dod))
                {
                    armyInfo.DOD = DateTime.Parse(request.Dod);
                }
                _dbContext.CandidateArmyInfos.Add(armyInfo);
                _dbContext.SaveChanges();
            }
            else
            {
                armyInfo.ArmyNumber = request.ArmyNo;
                armyInfo.Unit = request.Unit;
                armyInfo.Corps = request.Corps;
                if (!string.IsNullOrEmpty(request.Dod))
                {
                    armyInfo.DOD = DateTime.Parse(request.Dod);
                }
                _dbContext.SaveChanges();
            }
            return true;
        }

        public IList<CandidateSummaryResponse> GetSummary()
        {
            IList<CandidateSummaryResponse> candidateSummaryResponses = new List<CandidateSummaryResponse>();
            candidateSummaryResponses = _dbContext.CandidateHasCourses.Where(x => x.CourseId == 1)
                .Select(x => new CandidateSummaryResponse()
                {
                    RegistrationNo = x.RegistrationNumber,
                    Name = x.CandidateCnicNavigation.FirstName + ' ' + x.CandidateCnicNavigation.MiddleName + ' ' + x.CandidateCnicNavigation.LastName,
                    FathersName = x.CandidateCnicNavigation.FatherName,
                    District = x.CandidateCnicNavigation.District.Name,
                    Date = x.CandidateCnicNavigation.CandidateTestCharges.First(x => x.CourseId == 1).CreateTime.ToString(),
                    AmountPaid = x.CandidateCnicNavigation.CandidateTestCharges.First(x => x.CourseId == 1).AmountPaid.Value
                }).ToList();
            return candidateSummaryResponses;
        }
    }
}
