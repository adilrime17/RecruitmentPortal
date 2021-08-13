using STC.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Core.EligibilityCheck
{
    public interface IEligibilityCheckService
    {
        bool Check(Candidate candidate, bool NCsE);
    }
}
