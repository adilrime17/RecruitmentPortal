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
            IList<CandidateTestScore> candidateTestScore = _dbContext.CandidateTestScores.Where(x => x.CandidateCnic == cnic && x.CourseId == 1).ToList();
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateTestCharges).First(x => x.Cnic == cnic);
            response.TestsToAppear.RegistrationNo = candidate.CandidateHasCourses.First(x => x.CourseId == 1).RegistrationNumber;
            foreach(CandidateTestScore test in candidateTestScore)
            {
                switch(test.Test.Name)
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
                    case "Aptitude test":
                        response.TestsToAppear.Apt = true;
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
            response.ChargesPaid = candidate.CandidateTestCharges.First(x => x.CourseId == 1).ChargesPaid;
            return response;
        }

        public bool UpdateTestsToAppear(string cnic, TestsRequest request)
        {
            IList<Test> tests = _dbContext.Tests.OrderBy(x => x.Id).ToList();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                IList<CandidateTestScore> candidateTestScores = _dbContext.CandidateTestScores.Where(x => x.CandidateCnic == cnic && x.CourseId == 1).ToList();
                CandidateTestCharge candidateTestCharge = _dbContext.CandidateTestCharges.First(x => x.CandidateCnic == cnic && x.CourseId == 1);
                if (candidateTestScores.Count > 0)
                {
                    _dbContext.CandidateTestScores.RemoveRange(candidateTestScores);
                    _dbContext.CandidateTestCharges.Remove(candidateTestCharge);
                    _dbContext.SaveChanges();
                }

                Test test = null;
                if (request.TestsToAppear.Personality)
                {
                    test = tests.First(x => x.Id == 1);
                }
                if (request.TestsToAppear.Intelligence)
                {
                    test = tests.First(x => x.Id == 2);
                }
                if (request.TestsToAppear.WrittenUnderMatric)
                {
                    test = tests.First(x => x.Id == 3);
                }
                if (request.TestsToAppear.WrittenMatric)
                {
                    test = tests.First(x => x.Id == 4);
                }
                if (request.TestsToAppear.Tech)
                {
                    test = tests.First(x => x.Id == 5);
                }
                if (request.TestsToAppear.Clerk)
                {
                    test = tests.First(x => x.Id == 6);
                }
                if (request.TestsToAppear.Apt)
                {
                    test = tests.First(x => x.Id == 7);
                }
                if (request.TestsToAppear.Dit)
                {
                    test = tests.First(x => x.Id == 8);
                }
                if (request.TestsToAppear.Hafiz)
                {
                    test = tests.First(x => x.Id == 9);
                }
                if (request.TestsToAppear.Pet)
                {
                    test = tests.First(x => x.Id == 10);
                }
                if (request.TestsToAppear.Dlh)
                {
                    test = tests.First(x => x.Id == 11);
                }
                CandidateTestScore candidateTestScore = new CandidateTestScore()
                {
                    CandidateCnic = cnic,
                    CourseId = 1,
                    TestId = test.Id,
                    TestDate = DateTime.Now.AddDays(1).Date
                };
                _dbContext.CandidateTestScores.Add(candidateTestScore);
                _dbContext.SaveChanges();
                candidateTestCharge = new CandidateTestCharge()
                {
                    CandidateCnic = cnic,
                    CourseId = 1,
                    AmountToPay = 0,
                    AmountPaid = request.ChargesPaid ? 500 : 0,
                    ChargesPaid = request.ChargesPaid
                };
                _dbContext.CandidateTestCharges.Add(candidateTestCharge);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            return true;
        }

        public TestsSlipResponse GetPrintSlip(string cnic)
        {
            TestsSlipResponse response = new TestsSlipResponse();
            Candidate candidate = _dbContext.Candidates.First(x => x.Cnic == cnic);
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
            Candidate candidate = _dbContext.Candidates.Include(x => x.CandidateTestCharges).First(x => x.Cnic == cnic);
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
                    testId = 11;
                    break;
                case "hafiz":
                    testId = 9;
                    break;
                case "pet":
                    testId = 10;
                    break;
            }
            response.MarksObtained = _dbContext.CandidateTestScores.First(x => x.CandidateCnic == cnic && x.CourseId == 1 && x.TestId == testId).ObtainedMarks.Value;
            response.TotalFail = _dbContext.CandidateTestScores.Count(x => x.ObtainedMarks < _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks);
            response.TotalPass = _dbContext.CandidateTestScores.Count(x => x.ObtainedMarks >= _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks);
            response.TodayFail = _dbContext.CandidateTestScores.Count(x => x.ObtainedMarks < _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks && (x.UpdateTime.HasValue ? x.UpdateTime.Value.Date == DateTime.Now.Date : false));
            response.TodayPass = _dbContext.CandidateTestScores.Count(x => x.ObtainedMarks >= _dbContext.CourseHasTests.First(y => y.CourseId == 1 && y.TestId == testId).RequiredMarks && (x.UpdateTime.HasValue ? x.UpdateTime.Value.Date == DateTime.Now.Date : false));
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
                    testId = 11;
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
            Candidate candidate = _dbContext.Candidates.First(x => x.Cnic == cnic);
            IList<CandidateTestScore> candidateTestScore = _dbContext.CandidateTestScores.Where(x => x.CandidateCnic == cnic && x.CourseId == 1).ToList();
            IList<CourseHasTest> courseHasTests = _dbContext.CourseHasTests.Where(x => x.CourseId == 1).ToList();
            response.RegistrationNo = candidate.CandidateHasCourses.First(x => x.CourseId == 1).RegistrationNumber;
            response.Name = candidate.FirstName + ' ' + candidate.MiddleName + ' ' + candidate.LastName;
            response.District = candidate.District.Name;
            response.Personality = candidateTestScore.First(x => x.TestId == 1).ObtainedMarks >= courseHasTests.First(x => x.TestId == 1).RequiredMarks ? "Unsuitable" : "Suitable";
            response.Initial = candidateTestScore.First(x => x.TestId == 2).ObtainedMarks.Value;
            response.Written = candidateTestScore.First(x => x.TestId == 3 || x.TestId == 4).ObtainedMarks.Value;
            response.Dlh = candidateTestScore.First(x => x.TestId == 11).ObtainedMarks.Value < courseHasTests.First(x => x.TestId == 11).RequiredMarks ? "Fail" : "Pass";
            response.Dit = candidateTestScore.First(x => x.TestId == 8).ObtainedMarks.Value < courseHasTests.First(x => x.TestId == 8).RequiredMarks ? "Fail" : "Pass";
            response.Pet = candidateTestScore.First(x => x.TestId == 10).ObtainedMarks.Value < courseHasTests.First(x => x.TestId == 10).RequiredMarks ? "Fail" : "Pass";
            CandidateCourseSummary candidateCourseSummary = _dbContext.CandidateCourseSummaries.First(x => x.CandidateCnic == cnic && x.CourseId == 1);
            response.Sponser = candidateCourseSummary.Sponsor;
            response.Woswoa = candidateCourseSummary.WardVerified ? "Verified" : "Unverified";
            response.Clerk = candidateTestScore.First(x => x.TestId == 6).ObtainedMarks.Value;
            response.Tech = candidateTestScore.First(x => x.TestId == 5).ObtainedMarks.Value;
            response.Hafiz = candidateTestScore.First(x => x.TestId == 9).ObtainedMarks.Value < courseHasTests.First(x => x.TestId == 11).RequiredMarks ? "Fail" : "Pass";
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
    }
}
