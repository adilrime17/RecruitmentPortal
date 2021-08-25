using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class CandidatePETTestDetailRequest : CandidateTestDetailRequest
    {
        public string OneMile { get; set; }
        public string PullUp { get; set; }
        public string PushUp { get; set; }
        public string Crunches { get; set; }
        public bool Ditch { get; set; }
    }
}
