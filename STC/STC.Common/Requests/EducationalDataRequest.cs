﻿using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class EducationalDataRequest
    {
        public IList<EducationalData> CandidateEducationalData { get; set; }
    }

    public class EducationalData
    {
        public string Qualification { get; set; }
        public string Major { get; set; }
        public string Subject { get; set; }
        public float Obtained { get; set; }
        public float Total { get; set; }
        public string Grade { get; set; }
    }
}
