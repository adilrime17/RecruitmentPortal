using Microsoft.EntityFrameworkCore;
using STC.Common.Requests;
using STC.Common.Responses;
using STC.Data;
using STC.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace STC.Core.Stores
{
    public class TestsStore
    {
        private readonly STCDbContext _dbContext;

        public TestsStore(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TestsResponse GetTestsToAppear(string cnic)
        {
            TestsResponse response = new TestsResponse();
            IList<CandidateTestScore> candidateTestScore = _dbContext.CandidateTestScores.Include(x => x.Test).Where(x => x.CandidateCnic == cnic && x.CourseId == 1).ToList();
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateTestCharges).Include(x => x.CandidateHasCourses).FirstOrDefault(x => x.Cnic == cnic);
            if(candidate == null)
            {
                throw new Exception("incorrect cnic");
            }
            response.TestsToAppear = new TestsToAppear();
            response.TestsToAppear.RegistrationNo = candidate.CandidateHasCourses.First(x => x.CourseId == 1).RegistrationNumber;
            if(candidateTestScore.Count < 1)
            {
                response.TestsToAppear.Personality = true;
                response.TestsToAppear.Intelligence = true;
                response.TestsToAppear.WrittenUnderMatric = candidate.MaxQualificationId == 1;
                response.TestsToAppear.WrittenMatric = candidate.MaxQualificationId > 1;
                response.TestsToAppear.Tech = false;
                response.TestsToAppear.Clerk = false;
                response.TestsToAppear.Dlh = candidate.DLH;
                response.TestsToAppear.Dit = candidate.DIT;
                response.TestsToAppear.Hafiz = candidate.Hafiz;
                response.TestsToAppear.Pet = false;
            }
            else
            {
                foreach (CandidateTestScore test in candidateTestScore)
                {
                    switch (test.Test.Name)
                    {
                        case "Personality Test":
                            response.TestsToAppear.Personality = true;
                            break;
                        case "Int Test":
                            response.TestsToAppear.Intelligence = true;
                            break;
                        case "Written U/Matri":
                            response.TestsToAppear.WrittenUnderMatric = true;
                            break;
                        case "Written test":
                            response.TestsToAppear.WrittenMatric = true;
                            break;
                        case "Tech test":
                            response.TestsToAppear.Tech = true;
                            break;
                        case "Clk Test":
                            response.TestsToAppear.Clerk = true;
                            break;
                        case "DLH test":
                            response.TestsToAppear.Dlh = true;
                            break;
                        case "Computer Diploma":
                            response.TestsToAppear.Dit = true;
                            break;
                        case "Hifz Test":
                            response.TestsToAppear.Hafiz = true;
                            break;
                        case "PET":
                            response.TestsToAppear.Pet = true;
                            break;
                    }
                }
            }

            CandidateTestCharge candidateTestCharge = candidate.CandidateTestCharges.FirstOrDefault(x => x.CourseId == 1);
            response.ChargesPaid = candidateTestCharge != null ? candidateTestCharge.ChargesPaid : false;
            return response;
        }

        public bool UpdateTestsToAppear(string cnic, TestsRequest request)
        {
            IList<Test> tests = _dbContext.Tests.OrderBy(x => x.Id).ToList();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                IList<CandidateTestScore> candidateTestScores = _dbContext.CandidateTestScores.Where(x => x.CandidateCnic == cnic && x.CourseId == 1).ToList();
                CandidateTestCharge candidateTestCharge = _dbContext.CandidateTestCharges.FirstOrDefault(x => x.CandidateCnic == cnic && x.CourseId == 1);
                if (candidateTestScores.Count > 0)
                {
                    _dbContext.CandidateTestScores.RemoveRange(candidateTestScores);
                    _dbContext.SaveChanges();
                }

                IList<Test> testList = new List<Test>();
                if (request.TestsToAppear.Personality)
                {
                    testList.Add(tests.First(x => x.Id == 1));
                }
                if (request.TestsToAppear.Intelligence)
                {
                    testList.Add(tests.First(x => x.Id == 2));
                }
                if (request.TestsToAppear.WrittenUnderMatric)
                {
                    testList.Add(tests.First(x => x.Id == 3));
                }
                if (request.TestsToAppear.WrittenMatric)
                {
                    testList.Add(tests.First(x => x.Id == 4));
                }
                if (request.TestsToAppear.Tech)
                {
                    testList.Add(tests.First(x => x.Id == 5));
                }
                if (request.TestsToAppear.Clerk)
                {
                    testList.Add(tests.First(x => x.Id == 6));
                }
                if (request.TestsToAppear.Dlh)
                {
                    testList.Add(tests.First(x => x.Id == 7));
                }
                if (request.TestsToAppear.Dit)
                {
                    testList.Add(tests.First(x => x.Id == 8));
                }
                if (request.TestsToAppear.Hafiz)
                {
                    testList.Add(tests.First(x => x.Id == 9));
                }
                if (request.TestsToAppear.Pet)
                {
                    testList.Add(tests.First(x => x.Id == 10));
                }

                foreach(Test test in testList)
                {
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if(candidateTestCharge != null)
                {
                    candidateTestCharge.AmountToPay = 0;
                    candidateTestCharge.AmountPaid = request.ChargesPaid ? 500 : 0;
                    candidateTestCharge.ChargesPaid = request.ChargesPaid;
                }
                else
                {
                    candidateTestCharge = new CandidateTestCharge()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        AmountToPay = 0,
                        AmountPaid = request.ChargesPaid ? 500 : 0,
                        ChargesPaid = request.ChargesPaid
                    };
                    _dbContext.CandidateTestCharges.Add(candidateTestCharge);
                }

                _dbContext.SaveChanges();
                transaction.Commit();
            }
            return true;
        }

        public TestsSlipResponse GetPrintSlip(string cnic)
        {
            TestsSlipResponse response = new TestsSlipResponse();
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateHasCourses).First(x => x.Cnic == cnic);
            response.RegistrationNo = candidate.CandidateHasCourses.First(x => x.CourseId == 1).RegistrationNumber;
            response.SlipDetails = _dbContext.CandidateTestScores.Where(x => x.CandidateCnic == cnic && x.CourseId == 1).Select(x => new SlipDetails()
                {
                    Test = x.Test.Name,
                    Day = x.TestDate
                }).ToList();
            return response;
        }

        public CandidateTestDetailResponse GetCandidateTestDetail(string cnic, string testName)
        {
            CandidateTestDetailResponse response = new CandidateTestDetailResponse();
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateTestCharges).Include(x => x.CandidateHasCourses).FirstOrDefault(x => x.Cnic == cnic);
            if (candidate == null)
            {
                throw new Exception("incorrect cnic");
            }
            response.RegistrationNo = candidate.CandidateHasCourses.First(x => x.CourseId == 1).RegistrationNumber;
            response.Name = candidate.FirstName + ' ' + candidate.MiddleName + ' ' + candidate.LastName;
            int testId = 0;
            switch (testName)
            {
                case "intelligence":
                    testId = 2;
                    break;
                case "personality":
                    testId = 1;
                    break;
                case "writtenMatric":
                    testId = 4;
                    break;
                case "writtenUnderMatric":
                    testId = 3;
                    break;
                case "clerk":
                    testId = 6;
                    break;
                case "tech":
                    testId = 5;
                    break;
                case "dit":
                    testId = 8;
                    break;
                case "dlh":
                    testId = 7;
                    break;
                case "hafiz":
                    testId = 9;
                    break;
                case "pet":
                    testId = 10;
                    break;
            }
            CandidateTestScore candidateTestScore = _dbContext.CandidateTestScores.FirstOrDefault(x => x.CandidateCnic == cnic && x.CourseId == 1 && x.TestId == testId);
            if(candidateTestScore == null)
            {
                throw new Exception("Candidate does not have this test");
            }
            response.MarksObtained = candidateTestScore.ObtainedMarks.HasValue ? candidateTestScore.ObtainedMarks.Value : 0;
            response.TotalFail = _dbContext.CandidateTestScores.Where(x => x.TestId == testId).Count(x => x.ObtainedMarks < _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks);
            response.TotalPass = _dbContext.CandidateTestScores.Where(x => x.TestId == testId).Count(x => x.ObtainedMarks >= _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks);
            response.TodayFail = _dbContext.CandidateTestScores.Where(x => x.TestId == testId).Count(x => x.ObtainedMarks < _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks && (x.UpdateTime.HasValue ? x.UpdateTime.Value.Date == DateTime.Now.Date : false));
            response.TodayPass = _dbContext.CandidateTestScores.Where(x => x.TestId == testId).Count(x => x.ObtainedMarks >= _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks && (x.UpdateTime.HasValue ? x.UpdateTime.Value.Date == DateTime.Now.Date : false));
            return response;
        }

        public CandidatePETTestDetailResponse GetCandidatePETTestDetail(string cnic)
        {
            CandidateTestScore candidateTestScore = _dbContext.CandidateTestScores.FirstOrDefault(x => x.CandidateCnic == cnic && x.CourseId == 1 && x.TestId == 10);
            if (candidateTestScore == null)
            {
                throw new Exception("Candidate does not have this test");
            }
            CandidatePETTestDetailResponse response = new CandidatePETTestDetailResponse();
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateHasCourses).Include(x => x.CandidateTestCharges).First(x => x.Cnic == cnic);
            response.RegistrationNo = candidate.CandidateHasCourses.First(x => x.CourseId == 1).RegistrationNumber;
            response.Name = candidate.FirstName + ' ' + candidate.MiddleName + ' ' + candidate.LastName;
            PhysicalTestScore physicalTestScore = _dbContext.PhysicalTestScores.FirstOrDefault(x => x.CandidateCnic == cnic && x.CourseId == 1);
            int testId = 10;
            if (physicalTestScore != null)
            {
                response.PullUp = physicalTestScore.PullUp;
                response.PushUp = physicalTestScore.PushUp;
                response.Crunches = physicalTestScore.Crunches;
                response.Ditch = physicalTestScore.Ditch;
                response.OneMile = physicalTestScore.OneMile;
                response.TestResults = _dbContext.CandidateTestScores.First(x => x.CandidateCnic == cnic && x.CourseId == 1 && x.TestId == testId).ObtainedMarks.Value;
            }
            response.TotalFail = _dbContext.CandidateTestScores.Where(x => x.TestId == 10).Count(x => x.ObtainedMarks < _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks);
            response.TotalPass = _dbContext.CandidateTestScores.Where(x => x.TestId == 10).Count(x => x.ObtainedMarks >= _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks);
            response.TodayFail = _dbContext.CandidateTestScores.Where(x => x.TestId == 10).Count(x => x.ObtainedMarks < _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks && (x.UpdateTime.HasValue ? x.UpdateTime.Value.Date == DateTime.Now.Date : false));
            response.TodayPass = _dbContext.CandidateTestScores.Where(x => x.TestId == 10).Count(x => x.ObtainedMarks >= _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks && (x.UpdateTime.HasValue ? x.UpdateTime.Value.Date == DateTime.Now.Date : false));
            return response;
        }

        public bool UpdateCandidateTestDetail(string cnic, string testName, CandidateTestDetailRequest request)
        {
            int testId = 0;
            switch (testName)
            {
                case "intelligence":
                    testId = 2;
                    break;
                case "personality":
                    testId = 1;
                    break;
                case "writtenMatric":
                    testId = 4;
                    break;
                case "writtenUnderMatric":
                    testId = 3;
                    break;
                case "clerk":
                    testId = 6;
                    break;
                case "tech":
                    testId = 5;
                    break;
                case "dit":
                    testId = 8;
                    break;
                case "dlh":
                    testId = 7;
                    break;
                case "hafiz":
                    testId = 9;
                    break;
                case "pet":
                    testId = 10;
                    break;
            }
            CandidateTestScore candidateTestScore = _dbContext.CandidateTestScores.First(x => x.CandidateCnic == cnic && x.CourseId == 1 && x.TestId == testId);
            candidateTestScore.ObtainedMarks = request.TestResults;
            return _dbContext.SaveChanges() > 0;
        }

        public CandidateMarksSummaryResponse GetCandidateMarksSummary(string cnic)
        {
            CandidateMarksSummaryResponse response = new CandidateMarksSummaryResponse();
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateMedicalInfos).Include(x => x.CandidateHasCourses).Include(x => x.District).First(x => x.Cnic == cnic);
            IList<CandidateTestScore> candidateTestScore = _dbContext.CandidateTestScores.Where(x => x.CandidateCnic == cnic && x.CourseId == 1).ToList();
            IList<CourseHasTest> courseHasTests = _dbContext.CourseHasTests.Where(x => x.CourseId == 1).ToList();
            response.RegistrationNo = candidate.CandidateHasCourses.First(x => x.CourseId == 1).RegistrationNumber;
            response.Name = candidate.FirstName + ' ' + candidate.MiddleName + ' ' + candidate.LastName;
            response.District = candidate.District.Name;
            response.Personality = candidateTestScore.First(x => x.TestId == 1).ObtainedMarks >= courseHasTests.First(x => x.TestId == 1).RequiredMarks ? "Unsuitable" : "Suitable";
            float? obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 2)?.ObtainedMarks;
            if(obtainedMarks != null)
            {
                response.Initial = obtainedMarks.HasValue ? obtainedMarks.Value : 0;
            }
            obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 3 || x.TestId == 4)?.ObtainedMarks;
            if (obtainedMarks != null)
            {
                response.Written = obtainedMarks.HasValue ? obtainedMarks.Value : 0;
            }
            obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 7)?.ObtainedMarks;
            if (obtainedMarks != null)
            {
                response.Dlh = (obtainedMarks.HasValue ? obtainedMarks.Value : 0) < courseHasTests.First(x => x.TestId == 7).RequiredMarks ? "Fail" : "Pass";
            }
            obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 8)?.ObtainedMarks;
            if (obtainedMarks != null)
            {
                response.Dit = (obtainedMarks.HasValue ? obtainedMarks.Value : 0) < courseHasTests.First(x => x.TestId == 8).RequiredMarks ? "Fail" : "Pass";
            }
            obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 10)?.ObtainedMarks;
            if (obtainedMarks != null)
            {
                response.Pet = (obtainedMarks.HasValue ? obtainedMarks.Value : 0) < courseHasTests.First(x => x.TestId == 10).RequiredMarks ? "Fail" : "Pass";
            }
            CandidateCourseSummary candidateCourseSummary = _dbContext.CandidateCourseSummaries.FirstOrDefault(x => x.CandidateCnic == cnic && x.CourseId == 1);
            response.Woswoa = "Unverified";
            if (candidateCourseSummary != null)
            {
                response.Sponser = candidateCourseSummary.Sponsor;
                response.Woswoa = candidateCourseSummary.WardVerified ? "Verified" : "Unverified";
            }
            obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 6)?.ObtainedMarks;
            if(obtainedMarks != null)
            {
                response.Clerk = obtainedMarks.HasValue ? obtainedMarks.Value : 0;
            }
            obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 5)?.ObtainedMarks;
            if (obtainedMarks != null)
            {
                response.Tech = obtainedMarks.HasValue ? obtainedMarks.Value : 0;
            }
            obtainedMarks = candidateTestScore.FirstOrDefault(x => x.TestId == 9)?.ObtainedMarks;
            if (obtainedMarks != null)
            {
                response.Hafiz = (obtainedMarks.HasValue ? obtainedMarks.Value : 0) < courseHasTests.First(x => x.TestId == 9).RequiredMarks ? "Fail" : "Pass";
            }
            response.MedicalStatus = candidate.CandidateMedicalInfos.Last().FinalStatus;
            return response;
        }

        public bool UpdateCandidateMarksSummary(string cnic, CandidateMarksSummaryRequest request)
        {
            Candidate candidate = _dbContext.Candidates.First(x => x.Cnic == cnic);
            IList<CandidateTestScore> candidateTestScore = _dbContext.CandidateTestScores.Where(x => x.CandidateCnic == cnic && x.CourseId == 1).ToList();
            IList<CourseHasTest> courseHasTests = _dbContext.CourseHasTests.Where(x => x.CourseId == 1).ToList();
            CandidateCourseSummary candidateCourseSummary = _dbContext.CandidateCourseSummaries.FirstOrDefault(x => x.CandidateCnic == cnic && x.CourseId == 1);
            candidateCourseSummary.District = _dbContext.Districts.First(x => x.Name == request.District);
            candidateTestScore.First(x => x.TestId == 1).FinalStatus = request.Personality;
            candidateTestScore.First(x => x.TestId == 2).FinalStatus = request.Initial.ToString();
            candidateTestScore.First(x => x.TestId == 3 || x.TestId == 4).FinalStatus = request.Written.ToString();
            candidateTestScore.First(x => x.TestId == 11).FinalStatus = request.Dlh;
            candidateTestScore.First(x => x.TestId == 8).FinalStatus = request.Dit;
            candidateTestScore.First(x => x.TestId == 10).FinalStatus = request.Pet;
            candidateCourseSummary.Sponsor = request.Sponser;
            candidateCourseSummary.WardVerified = request.Woswoa == "Verified" ? true : false;
            candidateTestScore.First(x => x.TestId == 6).FinalStatus = request.Clerk.ToString();
            candidateTestScore.First(x => x.TestId == 5).FinalStatus = request.Tech.ToString();
            candidateTestScore.First(x => x.TestId == 9).FinalStatus = request.Hafiz;
            candidate.CandidateMedicalInfos.Last().FinalStatus = request.MedicalStatus;
            return _dbContext.SaveChanges() > 0;
        }

        public bool UpdateCandidatePETTestDetail(string cnic, CandidatePETTestDetailRequest request)
        {
            CandidateTestScore candidateTestScore = _dbContext.CandidateTestScores.FirstOrDefault(x => x.CandidateCnic == cnic && x.CourseId == 1 && x.TestId == 10);
            if(candidateTestScore == null)
            {
                throw new Exception("candidate test does not exist");
            }
            candidateTestScore.ObtainedMarks = request.TestResults;

            PhysicalTestScore physicalTestScore = new PhysicalTestScore()
            {
                CandidateCnic = cnic,
                CourseId = 1,
                OneMile = request.OneMile,
                PullUp = request.PullUp,
                PushUp = request.PushUp,
                Crunches = request.Crunches,
                Ditch = request.Ditch
            };
            _dbContext.PhysicalTestScores.Add(physicalTestScore);
            return _dbContext.SaveChanges() > 0;
        }
    }
}
