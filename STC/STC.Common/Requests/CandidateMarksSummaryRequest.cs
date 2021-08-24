using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class CandidateMarksSummaryRequest
    {
        public string RegistrationNo { get; set; }
        public string Name { get; set; }
        public string District { get; set; }
        public string Personality { get; set; }
        public float Initial { get; set; }
        public float Written { get; set; }
        public string Dlh { get; set; }
        public string Dit { get; set; }
        public string Pet { get; set; }
        public string Sponser { get; set; }
        public string Woswoa { get; set; }
        public float Clerk { get; set; }
        public float Tech { get; set; }
        public string Hafiz { get; set; }
        public string MedicalStatus { get; set; }
    }
}
