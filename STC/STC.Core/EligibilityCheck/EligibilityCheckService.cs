using STC.Data;
using STC.Data.Models;
using System;
using System.Linq;

namespace STC.Core.EligibilityCheck
{
    public class EligibilityCheckService : IEligibilityCheckService
    {
        private readonly STCDbContext _dbContext;

        public EligibilityCheckService(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Check(Candidate candidate, bool NCsE)
        {
            TimeSpan ageObj = DateTime.Today - candidate.DateOfBirth;
            int age = DateTime.Today.Year - candidate.DateOfBirth.Year;
            if (candidate.DateOfBirth.Date > DateTime.Today.AddYears(-age)) age--;

            float height = candidate.CandidateMedicalInfos.FirstOrDefault().Height;

            if(NCsE)
            {
                if(age >= 17 && age <= 35)
                {
                    return true;
                }
            }

            if(age > 17.5 && age < 26)
            {
                if(age > 25)
                {
                    if(candidate.District.Leniency)
                    {
                        if (candidate.MaxQualificationId == 4)
                        {
                            if (height >= 160)
                            {
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            if (candidate.MaxQualificationId == 3)
                            {
                                if (height >= 160)
                                {
                                    return true;
                                }
                                else
                                {
                                    if (height >= 157.5 && age < 19)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                            else
                            {
                                if (candidate.MaxQualificationId == 2)
                                {
                                    if (height >= 163)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        if (height >= 160.5 && age < 19)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }
                                    }
                                }
                                else
                                {
                                    if (candidate.MaxQualificationId == 1)
                                    {
                                        if (height >= 160)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            if (height >= 157.5 && age < 19)
                                            {
                                                return true;
                                            }
                                            else
                                            {
                                                return false;
                                            }
                                        }
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    if(candidate.WOS)
                    {
                        if (candidate.MaxQualificationId == 4)
                        {
                            if (height >= 160)
                            {
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            if(candidate.MaxQualificationId == 3)
                            {
                                if (height >= 160)
                                {
                                    return true;
                                }
                                else
                                {
                                    if (height >= 157.5 && age < 19)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                            else
                            {
                                if(candidate.MaxQualificationId == 2)
                                {
                                    if (height >= 163)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        if (height >= 160.5 && age < 19)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }
                                    }
                                }
                                else
                                {
                                    if (candidate.MaxQualificationId == 1)
                                    {
                                        if (height >= 160)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            if (height >= 157.5 && age < 19)
                                            {
                                                return true;
                                            }
                                            else
                                            {
                                                return false;
                                            }
                                        }
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        if(candidate.DLH)
                        {
                            if(candidate.MaxQualificationId >= 2)
                            {
                                if (height >= 167.5)
                                {
                                    return true;
                                }
                                else
                                {
                                    if(height >= 165 && age < 19)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        if (candidate.LocationClassId == 5 && height >= 163)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return height >= 161.5 && age < 19 && candidate.LocationClassId == 5;
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if(candidate.MaxQualificationId == 1)
                                {
                                    if (candidate.LocationClassId == 5 && height >= 163)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return height >= 161.5 && age < 19 && candidate.LocationClassId == 5;
                                    }
                                }
                            }
                        }
                        else
                        {
                            if(candidate.WOA && candidate.MaxQualificationId == 4)
                            {
                                if (height >= 160)
                                {
                                    return true;
                                }
                                else
                                {
                                    if (height >= 157.5 && age < 19)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                            else
                            {
                                if(candidate.WOA)
                                {
                                    if (age <= 24)
                                    {
                                        if (candidate.MaxQualificationId == 3 || candidate.MaxQualificationId == 1)
                                        {
                                            if (height >= 160)
                                            {
                                                return true;
                                            }
                                            else
                                            {
                                                if (height >= 157.5 && age < 19)
                                                {
                                                    return true;
                                                }
                                                else
                                                {
                                                    return false;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            if (candidate.MaxQualificationId == 2)
                                            {
                                                if (height >= 167.5)
                                                {
                                                    return true;
                                                }
                                                else
                                                {
                                                    if (height >= 165 && age < 19)
                                                    {
                                                        return true;
                                                    }
                                                    else
                                                    {
                                                        if (candidate.LocationClassId == 5 && height >= 163)
                                                        {
                                                            return true;
                                                        }
                                                        else
                                                        {
                                                            if (height >= 161.5 && age < 19 && candidate.LocationClassId == 5)
                                                            {
                                                                return true;
                                                            }
                                                            else
                                                            {
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                return false;
                                            }
                                        }
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                                else
                                {
                                    if(candidate.MaxQualificationId == 4)
                                    {
                                        if (age <= 24)
                                        {
                                            if (height >= 160)
                                            {
                                                return true;
                                            }
                                            else
                                            {
                                                if (height >= 157.5 && age < 19)
                                                {
                                                    return true;
                                                }
                                                else
                                                {
                                                    return false;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            return false;
                                        }
                                    }
                                    else
                                    {
                                        if(age < 23)
                                        {
                                            if (candidate.MaxQualificationId == 3 || candidate.MaxQualificationId == 1)
                                            {
                                                if (height >= 160)
                                                {
                                                    return true;
                                                }
                                                else
                                                {
                                                    if (height >= 157.5 && age < 19)
                                                    {
                                                        return true;
                                                    }
                                                    else
                                                    {
                                                        return false;
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                if (candidate.MaxQualificationId == 2)
                                                {
                                                    if(height >= 167.5)
                                                    {
                                                        return true;
                                                    }
                                                    else
                                                    {
                                                        if (height >= 165 && age < 19)
                                                        {
                                                            return true;
                                                        }
                                                        else
                                                        {
                                                            if(candidate.LocationClassId == 5 && height >= 163)
                                                            {
                                                                return true;
                                                            }
                                                            else
                                                            {
                                                                if(height >= 161.5 && age < 19 && candidate.LocationClassId == 5)
                                                                {
                                                                    return true;
                                                                }
                                                                else
                                                                {
                                                                    return false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    return false;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                return false;
            }
            return false;
        }

        private float CalculateYourAge(DateTime Dob)
        {
            DateTime Now = DateTime.Now;
            int Years = new DateTime(DateTime.Now.Subtract(Dob).Ticks).Year - 1;
            DateTime PastYearDate = Dob.AddYears(Years);
            int Months = 0;
            for (int i = 1; i <= 12; i++)
            {
                if (PastYearDate.AddMonths(i) == Now)
                {
                    Months = i;
                    break;
                }
                else if (PastYearDate.AddMonths(i) >= Now)
                {
                    Months = i - 1;
                    break;
                }
            }
            int Days = Now.Subtract(PastYearDate.AddMonths(Months)).Days;
            int Hours = Now.Subtract(PastYearDate).Hours;
            int Minutes = Now.Subtract(PastYearDate).Minutes;
            int Seconds = Now.Subtract(PastYearDate).Seconds;
            return Years + (Months / 12);
            //return String.Format("Age: {0} Year(s) {1} Month(s) {2} Day(s) {3} Hour(s) {4} Second(s)",
            //Years, Months, Days, Hours, Seconds);
        }
    }
}
