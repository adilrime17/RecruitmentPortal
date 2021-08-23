using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class TestsRequest
    {
        public TestsToAppear TestsToAppear { get; set; } = new TestsToAppear();
        public bool ChargesPaid { get; set; }
    }
    public class TestsToAppear
    {
        public string RegistrationNo { get; set; }
        public bool Personality { get; set; }
        public bool Intelligence { get; set; }
        public bool WrittenMatric { get; set; }
        public bool WrittenUnderMatric { get; set; }
        public bool Clerk { get; set; }
        public bool Tech { get; set; }
        public bool Dit { get; set; }
        public bool Dlh { get; set; }
        public bool Hafiz { get; set; }
        public bool Pet { get; set; }
        public bool Apt { get; set; }
    }
}
