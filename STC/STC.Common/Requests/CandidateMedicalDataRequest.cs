using STC.Common.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class CandidateMedicalDataRequest
    {
        public string RegistrationNo { get; set; }
        public string Name { get; set; }
        public float Height { get; set; }
        public ChestSize Chest { get; set; }
        public float Weight { get; set; }
        public float Temperature { get; set; }
        public float PulseRate { get; set; }
        public BloodPressure BloodPressure { get; set; }
        public string MedicalStatusUpdate { get; set; }
        public string Remarks { get; set; }
        public string CommentsByRMO { get; set; }
        public string Status { get; set; }
        public IList<SelectResponse> AddedDeformityList { get; set; }
    }

    public class BloodPressure
    {
        public int Bp0 { get; set; }
        public int Bp1 { get; set; }
    }
}
