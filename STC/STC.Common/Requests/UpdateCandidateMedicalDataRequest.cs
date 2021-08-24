using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class UpdateCandidateMedicalDataRequest
    {
        public CandidateMedicalDataRequest CandidateMedicalData { get; set; }
        public bool MedicallyFit { get; set; }
    }
}
