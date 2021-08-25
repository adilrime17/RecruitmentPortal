using STC.Common.Requests;
using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Responses
{
    public class CandidatePETTestDetailResponse : CandidatePETTestDetailRequest
    {
        public string RegistrationNo { get; set; }
        public string Name { get; set; }
        public int TodayFail { get; set; }
        public int TotalFail { get; set; }
        public int TodayPass { get; set; }
        public int TotalPass { get; set; }
    }
}
