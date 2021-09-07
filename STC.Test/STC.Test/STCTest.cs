using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using STC.Common.Requests;
using STC.Common.Responses;
using STC.Core.EligibilityCheck;
using STC.Core.Stores;
using STC.Data;
using STC.Data.Models;
using System;
using System.Collections.Generic;

namespace STC.Test
{
    [TestClass]
    public class STCTest
    {
        [TestMethod]
        public void CompleteFlowTest()
        {
            // init
            var optionsBuilder = new DbContextOptionsBuilder<STCDbContext>();
            string connectionString = "Server=localhost;Database=stc;Uid=root;Pwd=root;";
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

            using (STCDbContext dbContext = new STCDbContext(optionsBuilder.Options))
            {
                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    // data
                    string cnic = "1234512345671";

                    // stores
                    CandidateStore candidateStore = new CandidateStore(dbContext, new EligibilityCheckService(dbContext));
                    EducationStore educationStore = new EducationStore(dbContext);
                    TestsStore testsStore = new TestsStore(dbContext);

                    // eligibility check
                    CandidateResponse candidateResponse = candidateStore.GetDetails(cnic);
                    Assert.IsNull(candidateResponse);

                    CheckEligibilityResponse checkEligibilityResponse = candidateStore.CheckEligibility(new CandidateCreateRequest()
                    {
                        Cnic = cnic,
                        SvasXmatch = false,
                        Ncse = false,
                        FirstName = "Test",
                        MiddleName = "",
                        LastName = "Me",
                        FatherName = "Test Father",
                        District = "Islamabad",
                        LocationClass = "Pb",
                        DateOfBirth = new System.DateTime(1998, 07, 26),
                        MaxQualification = "Inter",
                        Woa = true,
                        Wos = false,
                        Dlh = true,
                        Height = 170,
                        Chest = new ChestSize()
                        {
                            Chest0 = 5,
                            Chest1 = 10
                        },
                        Weight = 70
                    });
                    Assert.AreEqual<string>("SP21-" + cnic + "-1", checkEligibilityResponse.RegistrationNo);
                    Assert.IsTrue(checkEligibilityResponse.CandidateEligible);

                    // personal information
                    candidateResponse = candidateStore.GetDetails(cnic);
                    Assert.IsNotNull(candidateResponse);

                    bool updateDataResponse = candidateStore.UpdateData(cnic, new CandidateUpdateRequest()
                    {
                        SvasXmatch = false,
                        Ncse = false,
                        FirstName = "Test",
                        MiddleName = "",
                        LastName = "Me",
                        FatherName = "Test Father",
                        District = "Islamabad",
                        LocationClass = "Pb",
                        DateOfBirth = new System.DateTime(1998, 07, 26),
                        ContactNo = "03319849845",
                        GuardianContactNo = "03319849845",
                        MaxQualification = "Inter",
                        Woa = true,
                        Wos = false,
                        Dlh = true,
                        Dit = false,
                        Hafiz = false
                    });
                    Assert.IsTrue(updateDataResponse);

                    // education
                    IList<SelectResponse> list = educationStore.GetAllMaxQualifications();
                    Assert.IsTrue(list.Count > 0);
                    list = educationStore.GetAllLevels();
                    Assert.IsTrue(list.Count > 0);
                    list = educationStore.GetAllDegrees(1);
                    Assert.IsTrue(list.Count > 0);
                    list = educationStore.GetAllMajors(3);
                    Assert.IsTrue(list.Count > 0);
                    list = educationStore.GetAllSubjects(1);
                    Assert.IsTrue(list.Count > 0);

                    EducationalDataResponse educationalDataResponse = educationStore.GetEducationalData(cnic);
                    Assert.IsTrue(educationalDataResponse.CandidateEducationalData.Count == 0);

                    bool updateEducationalDataResponse = educationStore.UpdateEducationalData(cnic, new EducationalDataRequest()
                    {
                        CandidateEducationalData = new List<EducationalData>()
                        {
                            {
                                new EducationalData()
                                {
                                    Level = "SSC",
                                    Degree = "10th",
                                    Major = "Science",
                                    Subject = "CS",
                                    Grade = "A",
                                    Obtained = 80,
                                    Total = 100
                                }
                            },
                            {
                                new EducationalData()
                                {
                                    Level = "Master",
                                    Degree = "BSCS",
                                    Major = "",
                                    Subject = "",
                                    Grade = "A",
                                    Obtained = 300,
                                    Total = 500
                                }
                            }
                        }
                    });
                    Assert.IsTrue(updateEducationalDataResponse);

                    // woa/wos
                    CandidateArmyDataResponse candidateArmyDataResponse = candidateStore.GetArmyData(cnic);
                    Assert.IsNotNull(candidateArmyDataResponse);

                    bool updateArmyDataResponse = candidateStore.UpdateArmyData(cnic, new CandidateArmyDataRequest()
                    {
                        ArmyNo = "123",
                        Unit = "456",
                        Corps = "789",
                        Dod = ""
                    });
                    Assert.IsTrue(updateArmyDataResponse);

                    // test to appear
                    TestsResponse testsResponse = testsStore.GetTestsToAppear(cnic);
                    Assert.IsNotNull(testsResponse);

                    bool updateTestsToAppearResponse = testsStore.UpdateTestsToAppear(cnic, new TestsRequest()
                    {
                        TestsToAppear = new TestsToAppear()
                        {
                            Personality = true,
                            Intelligence = true,
                            WrittenMatric = true,
                            WrittenUnderMatric = false,
                            Clerk = true,
                            Tech = true,
                            Dlh = true,
                            Hafiz = false,
                            Pet = true,
                            Dit = false
                        },
                        ChargesPaid = true
                    });
                    Assert.IsTrue(updateTestsToAppearResponse);

                    // print slip
                    TestsSlipResponse testsSlipResponse = testsStore.GetPrintSlip(cnic);
                    Assert.IsNotNull(testsSlipResponse);

                    // summary
                    IList<CandidateSummaryResponse> candidateSummaryResponses = candidateStore.GetSummary(DateTime.Now);
                    Assert.IsTrue(candidateSummaryResponses.Count > 0);

                    CandidateTestDetailResponse candidateTestDetailResponse = testsStore.GetCandidateTestDetail(cnic, "intelligence");
                    Assert.IsNotNull(candidateTestDetailResponse);

                    transaction.Rollback();
                }
            }
        }
    }
}
