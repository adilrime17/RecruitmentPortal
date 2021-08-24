using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate_test_charge")]
    [Index(nameof(CourseId), Name = "fk_default_course1_idx")]
    public partial class CandidateTestCharge
    {
        [Key]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }
        [Column("amount_to_pay")]
        public float? AmountToPay { get; set; }
        [Column("amount_paid")]
        public float? AmountPaid { get; set; }
        [Column("charges_paid")]
        public bool ChargesPaid { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.CandidateTestCharges))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
        [ForeignKey(nameof(CourseId))]
        [InverseProperty("CandidateTestCharges")]
        public virtual Course Course { get; set; }
    }
}
