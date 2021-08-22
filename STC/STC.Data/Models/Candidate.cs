using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate")]
    [Index(nameof(DistrictId), Name = "fk_candidate_district1_idx")]
    [Index(nameof(LocationClassId), Name = "fk_candidate_location_class1_idx")]
    [Index(nameof(MaxQualificationId), Name = "fk_candidate_qualification1_idx")]
    public partial class Candidate
    {
        public Candidate()
        {
            CandidateCourseSummaries = new HashSet<CandidateCourseSummary>();
            CandidateHasCourses = new HashSet<CandidateHasCourse>();
            CandidateHasEducations = new HashSet<CandidateHasEducation>();
            CandidateMedicalInfos = new HashSet<CandidateMedicalInfo>();
            CandidateTestScores = new HashSet<CandidateTestScore>();
            PhysicalTestScores = new HashSet<PhysicalTestScore>();
        }

        [Key]
        [Column("cnic")]
        [StringLength(50)]
        public string Cnic { get; set; }
        [Column("district_id")]
        public int DistrictId { get; set; }
        [Column("location_class_id")]
        public int LocationClassId { get; set; }
        [Column("max_qualification_id")]
        public int MaxQualificationId { get; set; }
        [Column("n_c_s_e")]
        public bool NCSE { get; set; }
        [Required]
        [Column("first_name")]
        [StringLength(250)]
        public string FirstName { get; set; }
        [Column("middle_name")]
        [StringLength(250)]
        public string MiddleName { get; set; }
        [Required]
        [Column("last_name")]
        [StringLength(250)]
        public string LastName { get; set; }
        [Required]
        [Column("father_name")]
        [StringLength(500)]
        public string FatherName { get; set; }
        [Column("date_of_birth", TypeName = "date")]
        public DateTime DateOfBirth { get; set; }
        [Column("w_o_s")]
        public bool WOS { get; set; }
        [Column("w_o_a")]
        public bool WOA { get; set; }
        [Column("d_l_h")]
        public bool DLH { get; set; }
        [Column("d_i_t")]
        public bool DIT { get; set; }
        [Column("hafiz")]
        public bool Hafiz { get; set; }
        [Column("contact_phone")]
        [StringLength(50)]
        public string ContactPhone { get; set; }
        [Column("guardian_phone")]
        [StringLength(50)]
        public string GuardianPhone { get; set; }
        [Column("svas_xmatch")]
        public bool? SvasXmatch { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [ForeignKey(nameof(DistrictId))]
        [InverseProperty("Candidates")]
        public virtual District District { get; set; }
        [ForeignKey(nameof(LocationClassId))]
        [InverseProperty("Candidates")]
        public virtual LocationClass LocationClass { get; set; }
        [ForeignKey(nameof(MaxQualificationId))]
        [InverseProperty(nameof(Qualification.Candidates))]
        public virtual Qualification MaxQualification { get; set; }
        [InverseProperty("CandidateCnicNavigation")]
        public virtual CandidateArmyInfo CandidateArmyInfo { get; set; }
        [InverseProperty(nameof(CandidateCourseSummary.CandidateCnicNavigation))]
        public virtual ICollection<CandidateCourseSummary> CandidateCourseSummaries { get; set; }
        [InverseProperty(nameof(CandidateHasCourse.CandidateCnicNavigation))]
        public virtual ICollection<CandidateHasCourse> CandidateHasCourses { get; set; }
        [InverseProperty(nameof(CandidateHasEducation.CandidateCnicNavigation))]
        public virtual ICollection<CandidateHasEducation> CandidateHasEducations { get; set; }
        [InverseProperty(nameof(CandidateMedicalInfo.CandidateCnicNavigation))]
        public virtual ICollection<CandidateMedicalInfo> CandidateMedicalInfos { get; set; }
        [InverseProperty(nameof(CandidateTestScore.CandidateCnicNavigation))]
        public virtual ICollection<CandidateTestScore> CandidateTestScores { get; set; }
        [InverseProperty(nameof(PhysicalTestScore.CandidateCnicNavigation))]
        public virtual ICollection<PhysicalTestScore> PhysicalTestScores { get; set; }
    }
}
