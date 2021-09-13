using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class CandidateUpdateRequest
    {
        public bool Ncse { get; set; }
        public string RegistrationNo { get; set; }
        public bool SvasXmatch { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string District { get; set; }
        public string LocationClass { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ContactNo { get; set; }
        public string GuardianContactNo { get; set; }
        public string MaxQualification { get; set; }
        public bool Woa { get; set; }
        public bool Wos { get; set; }
        public bool Dlh { get; set; }
        public bool Dit { get; set; }
        public bool Hafiz { get; set; }
        public bool VisibleDeformity { get; set; }
        public float Height { get; set; }
        public ChestSize Chest { get; set; } = new ChestSize();
        public float Weight { get; set; }
    }

    public class ChestSize
    {
        public float Chest0 { get; set; }
        public float Chest1 { get; set; }
    }
}
