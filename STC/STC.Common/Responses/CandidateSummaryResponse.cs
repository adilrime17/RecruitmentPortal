using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Responses
{
    public class CandidateSummaryResponse
    {
        public string RegistrationNo { get; set; }
        public string Name { get; set; }
        public string FathersName { get; set; }
        public string District { get; set; }
        public string Date { get; set; }
        public float AmountPaid { get; set; }
    }
}
