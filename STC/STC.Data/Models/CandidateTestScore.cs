using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate_test_score")]
    [Index(nameof(CandidateCnic), Name = "fk_candidate_has_course_has_test_candidate1_idx")]
    [Index(nameof(CourseId), Name = "fk_candidate_test_score_course1_idx")]
    [Index(nameof(TestId), Name = "fk_candidate_test_score_test1_idx")]
    public partial class CandidateTestScore
    {
        [Key]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }
        [Key]
        [Column("test_id")]
        public int TestId { get; set; }
        [Column("test_date", TypeName = "timestamp")]
        public DateTime TestDate { get; set; }
        [Column("obtained_marks")]
        public float? ObtainedMarks { get; set; }
        [Column("charges_paid")]
        public bool ChargesPaid { get; set; }
        [Column("final_status")]
        [StringLength(250)]
        public string FinalStatus { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.CandidateTestScores))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
        [ForeignKey(nameof(CourseId))]
        [InverseProperty("CandidateTestScores")]
        public virtual Course Course { get; set; }
        [ForeignKey(nameof(TestId))]
        [InverseProperty("CandidateTestScores")]
        public virtual Test Test { get; set; }
    }
}
