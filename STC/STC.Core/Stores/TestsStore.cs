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
            Candidate candidate = _dbContext.Candidates.First(x => x.Cnic == cnic);
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
            response.ChargesPaid = candidateTestScore.First().ChargesPaid;
            return response;
        }

        public bool UpdateTestsToAppear(string cnic, TestsRequest request)
        {
            IList<Test> tests = _dbContext.Tests.OrderBy(x => x.Id).ToList();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                if (request.TestsToAppear.Personality)
                {
                    Test test = tests.First(x => x.Id == 1);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.Intelligence)
                {
                    Test test = tests.First(x => x.Id == 2);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.WrittenUnderMatric)
                {
                    Test test = tests.First(x => x.Id == 3);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.WrittenMatric)
                {
                    Test test = tests.First(x => x.Id == 4);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.Tech)
                {
                    Test test = tests.First(x => x.Id == 5);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.Clerk)
                {
                    Test test = tests.First(x => x.Id == 6);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.Apt)
                {
                    Test test = tests.First(x => x.Id == 7);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.Dit)
                {
                    Test test = tests.First(x => x.Id == 8);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.Hafiz)
                {
                    Test test = tests.First(x => x.Id == 9);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
                if (request.TestsToAppear.Pet)
                {
                    Test test = tests.First(x => x.Id == 10);
                    CandidateTestScore candidateTestScore = new CandidateTestScore()
                    {
                        CandidateCnic = cnic,
                        CourseId = 1,
                        TestId = test.Id,
                        ChargesPaid = request.ChargesPaid,
                        TestDate = DateTime.Now.AddDays(1).Date
                    };
                    _dbContext.CandidateTestScores.Add(candidateTestScore);
                    _dbContext.SaveChanges();
                }
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
    }
}
