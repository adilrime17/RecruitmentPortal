using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Responses
{
    public class CheckEligibilityResponse
    {
        public string RegistrationNo { get; set; }
        public bool CandidateEligible { get; set; }

    }
}
