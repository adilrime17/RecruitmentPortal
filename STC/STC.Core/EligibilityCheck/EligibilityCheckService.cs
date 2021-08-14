using STC.Data;
using STC.Data.Models;
using System;

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
            int age = DateTime.Today.Year - candidate.DateOfBirth.Year;

            if (candidate.DateOfBirth.Date > DateTime.Today.AddYears(-age)) age--;

            if(NCsE)
            {
                if(age >= 17 && age <= 35)
                {
                    return true;
                }
                else
                {
                    return false;
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
                            if (candidate.Height >= 160)
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
                                if (candidate.Height >= 160)
                                {
                                    return true;
                                }
                                else
                                {
                                    if (candidate.Height >= 157.5 && age < 19)
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
                                    if (candidate.Height >= 163)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        if (candidate.Height >= 160.5 && age < 19)
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
                                        if (candidate.Height >= 160)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            if (candidate.Height >= 157.5 && age < 19)
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
                            if (candidate.Height >= 160)
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
                                if (candidate.Height >= 160)
                                {
                                    return true;
                                }
                                else
                                {
                                    if (candidate.Height >= 157.5 && age < 19)
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
                                    if (candidate.Height >= 163)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        if (candidate.Height >= 160.5 && age < 19)
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
                                        if (candidate.Height >= 160)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            if (candidate.Height >= 157.5 && age < 19)
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
                                if (candidate.Height >= 167.5)
                                {
                                    return true;
                                }
                                else
                                {
                                    if(candidate.Height >= 165 && age < 19)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        if (candidate.LocationClassId == 5 && candidate.Height >= 163)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return candidate.Height >= 161.5 && age < 19 && candidate.LocationClassId == 5;
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if(candidate.MaxQualificationId == 1)
                                {
                                    if (candidate.LocationClassId == 5 && candidate.Height >= 163)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return candidate.Height >= 161.5 && age < 19 && candidate.LocationClassId == 5;
                                    }
                                }
                            }
                        }
                        else
                        {
                            if(candidate.WOA && candidate.MaxQualificationId == 4)
                            {
                                if (candidate.Height >= 160)
                                {
                                    return true;
                                }
                                else
                                {
                                    if (candidate.Height >= 157.5 && age < 19)
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
                                            if (candidate.Height >= 160)
                                            {
                                                return true;
                                            }
                                            else
                                            {
                                                if (candidate.Height >= 157.5 && age < 19)
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
                                                if (candidate.Height >= 167.5)
                                                {
                                                    return true;
                                                }
                                                else
                                                {
                                                    if (candidate.Height >= 165 && age < 19)
                                                    {
                                                        return true;
                                                    }
                                                    else
                                                    {
                                                        if (candidate.LocationClassId == 5 && candidate.Height >= 163)
                                                        {
                                                            return true;
                                                        }
                                                        else
                                                        {
                                                            if (candidate.Height >= 161.5 && age < 19 && candidate.LocationClassId == 5)
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
                                            if (candidate.Height >= 160)
                                            {
                                                return true;
                                            }
                                            else
                                            {
                                                if (candidate.Height >= 157.5 && age < 19)
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
                                                if (candidate.Height >= 160)
                                                {
                                                    return true;
                                                }
                                                else
                                                {
                                                    if (candidate.Height >= 157.5 && age < 19)
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
                                                    if(candidate.Height >= 167.5)
                                                    {
                                                        return true;
                                                    }
                                                    else
                                                    {
                                                        if (candidate.Height >= 165 && age < 19)
                                                        {
                                                            return true;
                                                        }
                                                        else
                                                        {
                                                            if(candidate.LocationClassId == 5 && candidate.Height >= 163)
                                                            {
                                                                return true;
                                                            }
                                                            else
                                                            {
                                                                if(candidate.Height >= 161.5 && age < 19 && candidate.LocationClassId == 5)
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
    }
}
